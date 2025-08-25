import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';

// Note: server-side PDF extraction uses `pdf-parse`. Install with:
// cd frontend && pnpm add pdf-parse

export async function POST(req: NextRequest) {
  let resumeText: string | null = null;
  let jobRole = '';

  const contentType = req.headers.get('content-type') || '';

  try {
    if (contentType.includes('multipart/form-data')) {
      // handle file upload from browser FormData
      const form = await req.formData();
      const f = form.get('file') as File | null;
      jobRole = form.get('jobRole')?.toString() || '';
      if (f) {
        try {
          const ab = await f.arrayBuffer();
          const buffer = Buffer.from(ab);
          // require pdf-parse at runtime (optional dependency)
          let pdfParse: any = null;
          try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            pdfParse = require('pdf-parse');
          } catch (e) {
            // library missing — fall through to error handling
            throw new Error('pdf-parse not installed. Run `pnpm add pdf-parse` in frontend.');
          }
          const data = await pdfParse(buffer);
          resumeText = data?.text || null;
        } catch (e: any) {
          // fall through to resumeText null and error path below
          resumeText = null;
          console.error('PDF extraction failed:', e?.message || e);
        }
      }
    } else {
      // fallback for JSON POSTs
      const json = await req.json().catch(() => ({}));
      resumeText = json?.resumeText ?? null;
      jobRole = json?.jobRole ?? '';
    }

    if (!resumeText) {
      return NextResponse.json({ error: 'No resume text provided' }, { status: 400 });
    }

    const prompt = `You are an assistant that analyzes resumes. Given the resume text and a target job description, extract:\n1) A short analysis summary (analysisText).\n2) A list of skills with optional proficiency percentages (skills: [{name, level, category}]).\n3) A list of keywords (keywords: [string]).\n4) A gapAnalysis object with matching, missing, and recommendations.\n\nResume:\n${resumeText}\n\nJobDescription:\n${jobRole || ''}\n\nReturn a JSON object with keys: analysisText, skills (array), keywords (array), gapAnalysis (object). If you cannot provide structured JSON, return plain text.`;

    const res = await callGemini(prompt, { model: 'models/gemini-2.5-flash', timeoutMs: 20000 });

    // Extract candidate text from common shapes
    const candidateText = res?.candidates?.[0]?.content?.parts?.[0]?.text || res?.output?.text || res?.text || JSON.stringify(res);

    // Try parse
    let parsed: any = null;
    try {
      parsed = JSON.parse(candidateText);
    } catch (e) {
      const m = candidateText && candidateText.match(/\{[\s\S]*\}/);
      if (m) {
        try { parsed = JSON.parse(m[0]); } catch (e) { parsed = null; }
      }
    }

    const result: any = { raw: res, text: candidateText };
    if (parsed) {
      result.analysisText = parsed.analysisText || parsed.summary || candidateText;
      result.skills = parsed.skills || parsed.extractedSkills || null;
      result.keywords = parsed.keywords || null;
      result.gapAnalysis = parsed.gapAnalysis || null;
    } else {
      result.analysisText = candidateText;
    }

    return NextResponse.json({ result });
  } catch (err: any) {
    console.error('analyze-resume error:', err?.message || err);
    if (process.env.NODE_ENV !== 'production') {
      const mock = {
        result: {
          text: 'Mock analysis placeholder (no credentials or extraction failure).',
          analysisText: 'AI analysis unavailable: server credentials or extraction not configured.',
          skills: [],
          keywords: [],
          gapAnalysis: { matching: [], missing: [], recommendations: [] },
          raw: { error: err?.message }
        }
      };
      return NextResponse.json(mock);
    }
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
