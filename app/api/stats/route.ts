import { NextResponse } from "next/server";
import { getTravelStats } from "@/lib/stats";

export async function GET() {
  try {
    const stats = await getTravelStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to load travel stats:", error);

    return NextResponse.json(
      { error: "Failed to load travel stats" },
      { status: 500 }
    );
  }
}
