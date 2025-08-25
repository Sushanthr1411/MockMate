import { NextResponse } from "next/server";

// Stubbed route: server-side Gemini integration was removed per project decision.
export async function POST() {
  return NextResponse.json(
    { error: "Removed: server-side Gemini integration disabled (route stub)." },
    { status: 410 }
  );
}
