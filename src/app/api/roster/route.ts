import { db } from "@/db";
import { roster } from "@/db/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const allRoster = await db.query.roster.findMany({
    orderBy: [asc(roster.arrivalDateTime)],
  });
  return NextResponse.json(allRoster);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await db.insert(roster).values({
      name: body.name,
      arrivalDateTime: new Date(body.arrivalDateTime),
      departureDateTime: new Date(body.departureDateTime),
      arrivalCity: body.arrivalCity,
    });

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error("Error inserting roster data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
