// API route to analyze resume using Gemini
import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const { resumeText, jobRole } = await req.json();
  if (!resumeText) {
    return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
  }

  // create a helpful prompt that requests JSON-structured output if possible
  const prompt = `You are an assistant that analyzes resumes. Given the resume text and a target job description, extract:
  1) A short analysis summary.
  2) A list of skills with proficiency percentages (if detectable).
  3) A list of keywords.
  4) A gap analysis object with matching, missing, and recommendations.

  Resume:\n${resumeText}\n\nJobDescription:\n${jobRole || ""}\n
  Return a JSON object with keys: analysisText, skills (array), keywords (array), gapAnalysis (object).
  If you cannot provide structured JSON, return a plain-text analysis.
  `;

  try {
    // If no Gemini API key (local/dev), return a mocked response so frontend can be tested
    const hasApiKey = !!process.env.GEMINI_API_KEY || !!process.env.GEMINI_URL;
    if (!hasApiKey && process.env.NODE_ENV !== 'production') {
      const mock = {
        result: {
          text: "Mock analysis generated (no Gemini credentials).",
          analysisText: "Your resume is strong in JavaScript/React. Consider adding more backend exposure (Python, Docker).",
          skills: [
            { name: 'JavaScript', level: 88, category: 'Technical' },
            { name: 'React', level: 82, category: 'Technical' },
            { name: 'Node.js', level: 70, category: 'Technical' }
          ],
          keywords: ['JavaScript','React','Node.js','REST APIs'],
          gapAnalysis: { matching: ['JavaScript','React'], missing: ['Python','Docker'], recommendations: ['Add Python projects','Get Docker practice'] },
          raw: null
        }
      };
      return NextResponse.json(mock);
    }

    const geminiRes = await callGemini(prompt);

    // attempt to read response text in a few common places
    const candidateText = geminiRes?.candidates?.[0]?.content?.parts?.[0]?.text || geminiRes?.output?.text || geminiRes?.text || JSON.stringify(geminiRes);

    // try to parse JSON out of the candidateText
    let parsed: any = null;
    try {
      parsed = JSON.parse(candidateText);
    } catch (e) {
      // try to locate a JSON substring
      const jsonMatch = candidateText && candidateText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsed = JSON.parse(jsonMatch[0]);
        } catch (e) {
          parsed = null;
        }
      }
    }

    const result: any = {
      raw: geminiRes,
      text: candidateText,
    };

    if (parsed) {
      result.analysisText = parsed.analysisText || candidateText;
      result.skills = parsed.skills || parsed.extractedSkills || null;
      result.keywords = parsed.keywords || null;
      result.gapAnalysis = parsed.gapAnalysis || null;
    }

    return NextResponse.json({ result });
  } catch (err: any) {
    // If we're running locally (no production), fall back to a mocked result so the UI remains usable
    if (process.env.NODE_ENV !== 'production') {
      const mock = {
        result: {
          text: "Mock analysis generated after Gemini error (dev fallback).",
          analysisText: "Your resume is strong in JavaScript/React. Consider adding more backend exposure (Python, Docker).",
          skills: [
            { name: 'JavaScript', level: 88, category: 'Technical' },
            { name: 'React', level: 82, category: 'Technical' },
            { name: 'Node.js', level: 70, category: 'Technical' }
          ],
          keywords: ['JavaScript','React','Node.js','REST APIs'],
          gapAnalysis: { matching: ['JavaScript','React'], missing: ['Python','Docker'], recommendations: ['Add Python projects','Get Docker practice'] },
          raw: { error: err?.message }
        }
      };
      return NextResponse.json(mock);
    }

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
