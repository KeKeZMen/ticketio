import { db } from "@shared";
import { NextResponse } from "next/server";

export async function GET() {
  const places = await db.place.findMany();

  return NextResponse.json(places);
}
