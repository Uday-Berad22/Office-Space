import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/database";

export async function GET(request: NextRequest) {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: `Unauthorized ` }, { status: 401 });
  }
  try {
    const db = await getDatabase();

    // Clear all entries from the bookings collection
    const result = await db.collection("bookings").deleteMany({});

    console.log(`Cleared ${result.deletedCount} bookings`); // Added for logging

    return NextResponse.json(
      {
        message: "All bookings cleared successfully",
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing bookings:", error);
    return NextResponse.json(
      { error: "Failed to clear bookings" },
      { status: 500 }
    );
  }
}
