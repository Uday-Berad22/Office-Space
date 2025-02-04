import { getDatabase, User } from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, userId, fullName } = await request.json();
    console.log("email", email);

    if (!email || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection<User>("users");

    const existingUser = await usersCollection.findOne({ email });

    if (!existingUser) {
      await usersCollection.insertOne({
        email,
        user_id: userId,
        access_level: "user",
        name: fullName || "User",
        used_tokens: 0,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
