import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/database";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const db = await getDatabase();
    const formData = await req.formData();
    const user_id = formData.get("user_id") as string;
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const attachment = formData.get("attachment");

    let attachmentPath = null;

    if (attachment && typeof attachment !== "string") {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      // Ensure the uploads directory exists
      await mkdir(uploadDir, { recursive: true });
      const fileName = `${Date.now()}-${attachment.name || "attachment"}`;
      const filePath = path.join(uploadDir, fileName);
      const fileBuffer = Buffer.from(await attachment.arrayBuffer());
      await writeFile(filePath, new Uint8Array(fileBuffer));
      attachmentPath = `/uploads/${fileName}`;
    }

    const complaint = {
      user: user_id,
      subject,
      description,
      attachment: attachmentPath,
      date: new Date(),
      status: "open",
    };

    await db.collection("complaints").insertOne(complaint);

    return NextResponse.json(
      { message: "Complaint submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting complaint:", error);
    return NextResponse.json(
      {
        message: "Error submitting complaint",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
