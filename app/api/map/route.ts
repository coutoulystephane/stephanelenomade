import { NextResponse } from "next/server";
import { getVisitedDestinations } from "@/lib/mapData";

export async function GET() {
  try {
    const destinations = await getVisitedDestinations();

    return NextResponse.json(destinations);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load map data",
      },
      {
        status: 500,
      }
    );
  }
}