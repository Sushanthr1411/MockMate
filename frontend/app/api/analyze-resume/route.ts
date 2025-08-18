// API route to analyze resume using Gemini
import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const { resumeText } = await req.json();
  if (!resumeText) {
    return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
  }
  try {
    const geminiRes = await callGemini(`Analyze this resume: ${resumeText}`);
    return NextResponse.json({ result: geminiRes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
