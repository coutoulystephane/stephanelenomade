import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    const { data: claimsData } = await supabase.auth.getClaims();

    if (!claimsData?.claims) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { pins } = await req.json();

    if (!Array.isArray(pins)) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    for (const pin of pins) {
      const { error } = await supabase
        .from("destinations_master")
        .update({
          map_x: pin.map_x,
          map_y: pin.map_y,
        })
        .eq("geonameId", pin.geonameId);

      if (error) {
        console.error(error);

        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to save map pins",
      },
      {
        status: 500,
      }
    );
  }
}
