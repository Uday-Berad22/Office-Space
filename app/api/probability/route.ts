"use server";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";

interface Booking {
  _id: ObjectId;
  email: string;
  arrivalTime: string;
  departureTime: string;
  wantToCarPool: boolean;
  availableSeats: number;
  status: string;
}

interface User {
  email: string;
  used_tokens: number;
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDatabase();
    const usersCollection = db.collection<User>("users");

    const bookingsCollection = db.collection<Booking>("bookings");
    const currentUserEmail = user.emailAddresses[0].emailAddress;

    if (!currentUserEmail) {
      return NextResponse.json(
        { error: "No email provided in the request" },
        { status: 400 }
      );
    }

    const currentUserData = await usersCollection.findOne({
      email: currentUserEmail,
    });
    if (!currentUserData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const pendingBookings = await bookingsCollection
      .find({ status: "pending" })
      .toArray();
    const bookingsByUser = pendingBookings.reduce((acc, booking) => {
      if (!acc[booking.email]) {
        acc[booking.email] = [];
      }
      acc[booking.email].push(booking);
      return acc;
    }, {} as { [email: string]: Booking[] });

    const users = await usersCollection
      .find({ email: { $in: Object.keys(bookingsByUser) } })
      .toArray();

    users.sort((a, b) => a.used_tokens - b.used_tokens);

    let countOFUsersWithLessTokens = 0;
    let usersWithEqualTokens = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].used_tokens < currentUserData.used_tokens) {
        countOFUsersWithLessTokens++;
      } else if (users[i].used_tokens === currentUserData.used_tokens) {
        usersWithEqualTokens++;
      }
    }

    const numParkingSpots = 8;
    let probability: number;
    if (countOFUsersWithLessTokens >= numParkingSpots) {
      probability = 0;
    } else {
      probability =
        (numParkingSpots - countOFUsersWithLessTokens) / usersWithEqualTokens;
    }
    const waitlist = Math.max(users.length + 1 - 8, 0);
    return NextResponse.json({
      message: `Probability of getting a parking spot for user ${currentUserEmail}`,
      probability: Math.min(Math.max(probability, 0), 1),
      waitlist: waitlist,
    });
  } catch (error) {
    console.error("Error in calculating probability:", error);
    return NextResponse.json(
      { message: "Error in calculating probability" },
      { status: 500 }
    );
  }
}
