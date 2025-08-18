import { NextRequest, NextResponse } from "next/server"

// Replace with your actual Gemini API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY"

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription } = await req.json()
    // Call Gemini API
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [
            { text: `Resume: ${resumeText}\nJob Description: ${jobDescription}\nAnalyze the resume for skills, experience, education, missing skills, keyword gaps, formatting suggestions, and generate improvement tips. Return a structured JSON with all findings and a summary for a feedback report.` }
          ] }
        ]
      })
    })
    const geminiData = await response.json()
    return NextResponse.json({ success: true, data: geminiData })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Gemini API error" }, { status: 500 })
  }
}
