import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const db = await getDatabase();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch approved bookings from the database
    const approvedBookings = await db
      .collection("bookings")
      .find({ status: "approved" })
      .toArray();

    if (!approvedBookings || approvedBookings.length === 0) {
      return NextResponse.json(
        { message: "No approved bookings found" },
        { status: 404 }
      );
    }

    // Map the bookings to include only necessary information
    const peopleWithParkings = await Promise.all(
      approvedBookings.map(async (booking) => {
        const user = await db
          .collection("users")
          .findOne({ email: booking.email });
        return {
          email: booking.email,
          arrivalTime: booking.arrivalTime,
          departureTime: booking.departureTime,
          wantToCarPool: booking.wantToCarPool,
          availableSeats: booking.availableSeats,
          name: user ? user.name : "Unknown",
        };
      })
    );

    return NextResponse.json(
      {
        message: "Approved bookings fetched successfully",
        approvedBookings: peopleWithParkings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching approved bookings:", error);
    return NextResponse.json(
      { message: "Error fetching approved bookings" },
      { status: 500 }
    );
  }
}
