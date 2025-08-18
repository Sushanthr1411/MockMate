"use client"
import { useState } from "react";
import { ResumeUpload } from "@/components/resume/resume-upload";
import { SkillsAnalysis } from "@/components/resume/skills-analysis";
import { GapAnalysis } from "@/components/resume/gap-analysis";
export default function ResumeAnalysisPage() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [jobRole, setJobRole] = useState("");
  const [showJobInput, setShowJobInput] = useState(false);

  // Auto-expand textarea height
  function autoExpand(e: React.FormEvent<HTMLTextAreaElement>) {
    const target = e.currentTarget;
    target.style.height = "52px";
    target.style.height = `${target.scrollHeight}px`;
  }

  async function handleAnalyze() {
    if (!resumeText || !jobRole) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobRole })
      });
      const data = await res.json();
      setAnalysis(data.result?.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data.result));
    } catch (err) {
      setAnalysis("Error analyzing resume.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with extra gap from navbar */}
        <div className="text-center space-y-4 mb-16 mt-32">
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Resume Analysis
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your resume to get AI-powered insights, skill analysis, and personalized recommendations to optimize your job applications.
          </p>
        </div>

        {/* Upload Resume full width, remove ResumePreview */}
        <div className="w-full mb-8">
          <ResumeUpload onResumeExtracted={text => {
            setResumeText(text);
            setShowJobInput(true);
          }} />
        </div>

        {/* Job role input and analyze button only after Next is clicked */}
        {showJobInput && (
          <div className="flex flex-col items-center mt-12">
            <h2 className="text-3xl font-extrabold mb-6 text-white drop-shadow-md tracking-tight">Job Description</h2>
            <div className="w-full flex justify-center">
              <div className="job-card-wrapper" style={{width: '820px', maxWidth: '95vw'}}>
                <style>{`
                  /* Gemini-like pill: black theme + RGB rim */
                  .job-card-wrapper { display:flex; justify-content:center; }
                  .job-card { position: relative; border-radius: 9999px; overflow: visible; background: rgba(6,6,8,0.7); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.04); padding: 10px 14px; transition: transform .16s ease, box-shadow .16s ease; }

                  /* outer RGB rim */
                  /* animated RGB rim using a rotating conic gradient */
                  .job-card::before { content: ''; position: absolute; inset: -6px; border-radius: 9999px; background: conic-gradient(#00f0b0, #2f6bff, #9b6bff, #ff8a50, #00f0b0); filter: blur(12px); opacity: 0.24; pointer-events: none; z-index: -2; }
                  .job-card::after { content: ''; position: absolute; inset: 0; border-radius: 9999px; box-shadow: inset 0 2px 12px rgba(0,0,0,0.6); pointer-events: none; z-index: -1; }
                  /* subtle inner RGB tint to give the pill a gentle color cast */
                  .job-card .inner-rgb { position: absolute; inset: 0; border-radius: 9999px; background: linear-gradient(90deg, rgba(0,240,176,0.04), rgba(106,161,255,0.04), rgba(155,107,255,0.04)); pointer-events: none; z-index: 0; }

                  .job-card:hover { transform: translateY(-6px); box-shadow: 0 30px 80px rgba(2,6,23,0.7); }
                  .job-card:focus-within::before { opacity: 0.32; filter: blur(8px); }

                  .job-row { display: flex; gap: 16px; align-items: center; min-width: 640px; max-width: 100%; }
                  .job-icon { width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; background: rgba(255,255,255,0.02); border-radius: 10px; border: 1px solid rgba(255,255,255,0.03); }

                  .job-textarea { width: 100%; min-height: 48px; max-height: 220px; resize: none; background: transparent; color: #E8EFFA; font-size: 1rem; line-height: 1.5; border: none; outline: none; padding: 8px 0 8px 18px; caret-color: #00e6a5; }
                  .job-textarea::placeholder { color: rgba(230,235,245,0.28); }

                  .job-helper { margin-top: 10px; font-size: 0.95rem; color: rgba(230,235,245,0.5); text-align: left; }

                  .job-clear { background: transparent; border: none; color: rgba(230,235,245,0.5); padding: 6px; border-radius:8px; cursor: pointer; }
                  .job-clear:hover { color: rgba(255,255,255,0.9); transform: scale(1.03); }

                  /* mic removed - keeping input controls minimal */

                  /* slim handle (like Gemini top hint) */
                  .pill-handle { width: 44px; height: 6px; background: rgba(255,255,255,0.03); border-radius: 9999px; margin: 0 auto 10px; display: none; }

                  /* analyze button kept premium but slightly darker to fit black theme */
                  .analyze-btn { position: relative; display: inline-block; padding: 12px 36px; border-radius: 9999px; font-weight: 700; font-size: 1.02rem; color: #051016; background: linear-gradient(90deg, #00f0b0 0%, #6aa1ff 55%, #9b6bff 100%); border: none; cursor: pointer; box-shadow: 0 24px 70px rgba(50,80,255,0.10), 0 6px 30px rgba(0,200,140,0.04); transition: transform .12s ease, box-shadow .12s ease; }
                  .analyze-btn::after { content: ''; position: absolute; inset: -8px; border-radius: inherit; filter: blur(18px); background: linear-gradient(90deg, rgba(0,240,176,0.08), rgba(106,161,255,0.08), rgba(155,107,255,0.08)); z-index: -1; }
                  .analyze-btn:hover { transform: translateY(-4px); box-shadow: 0 36px 100px rgba(50,80,255,0.16), 0 12px 40px rgba(0,200,140,0.06); }
                  .analyze-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                  @media (max-width: 640px) {
                    .job-card-wrapper { padding: 0 16px; }
                    .job-row { gap: 12px; }
                    .job-icon { width: 40px; height: 40px; }
                    .job-textarea { min-height: 48px; }
                    .analyze-btn { padding: 10px 22px; }
                    .pill-handle { display: block; }
                  }

                `}</style>

                <div className="job-card">
                  <div className="inner-rgb" aria-hidden />
                  <div className="job-row">
                    <div className="job-icon" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6.5C3 5.67157 3.67157 5 4.5 5H19.5C20.3284 5 21 5.67157 21 6.5V17.5C21 18.3284 20.3284 19 19.5 19H4.5C3.67157 19 3 18.3284 3 17.5V6.5Z" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 9H16" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>

                    <textarea
                      className="job-textarea"
                      placeholder="Paste the job description here to analyze skill gaps..."
                      value={jobRole}
                      onChange={e => setJobRole(e.target.value)}
                      rows={1}
                      onInput={autoExpand}
                      aria-label="Job description"
                    />

                    <button
                      type="button"
                      className="job-clear"
                      onClick={() => setJobRole("")}
                      aria-label="Clear job description"
                      title="Clear"
                    >
                      ×
                    </button>
                  </div>

                  <div className="job-helper">Tip: Paste a job posting or short role summary to get targeted skill gap analysis.</div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={handleAnalyze}
                disabled={loading || !jobRole.trim()}
                className="analyze-btn"
              >
                {loading ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </div>
          </div>
  )}

        <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-16" />

        {/* Section header for analysis results */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Analysis Results</h2>
        </div>

        {/* Analysis sections stacked below, responsive for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div>
            <SkillsAnalysis />
          </div>
          <div>
            <GapAnalysis />
          </div>
        </div>

        {/* Loader and analysis result */}
        {loading && (
          <div className="mt-8 text-center text-lg text-blue-600">Analyzing your resume...</div>
        )}
        {analysis && (
          <div className="mt-8 p-6 bg-white rounded shadow text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Analysis Result</h2>
            <pre className="whitespace-pre-wrap break-words">{analysis}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
