"use client"
import { useState } from "react";
import { ResumeUpload } from "@/components/resume/resume-upload";
import { SkillsAnalysis } from "@/components/resume/skills-analysis";
import { GapAnalysis } from "@/components/resume/gap-analysis";
import { Recommendations } from "@/components/resume/recommendations";
import { Star } from "lucide-react";
export default function ResumeAnalysisPage() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [                                                                                                                                                                                                               jobRole, setJobRole] = useState("");
  const [showJobInput, setShowJobInput] = useState(false);
  const [skillsData, setSkillsData] = useState<any[] | null>(null);
  const [keywordsData, setKeywordsData] = useState<string[] | null>(null);
  const [gapAnalysisData, setGapAnalysisData] = useState<any | null>(null);

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
    setSkillsData(null);
    setGapAnalysisData(null);
    setKeywordsData(null);
    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobRole })
      });
      const data = await res.json();
      if (data.error) {
        setAnalysis(`Error: ${data.error}`);
        setLoading(false);
        return;
      }
      const result = data.result || data;

      // primary text
      const analysisText = result.analysisText || result.text || result.raw?.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(result.raw || result);
      setAnalysis(analysisText);

      // structured fields
      if (result.skills) setSkillsData(result.skills);
      if (result.keywords) setKeywordsData(result.keywords);
      if (result.gapAnalysis) setGapAnalysisData(result.gapAnalysis);

      // fallback: if API returned parsed JSON inside result.text, attempt to parse
      try {
        const maybe = JSON.parse(result.text || "");
        if (maybe.skills && !skillsData) setSkillsData(maybe.skills);
        if (maybe.keywords && !keywordsData) setKeywordsData(maybe.keywords);
        if (maybe.gapAnalysis && !gapAnalysisData) setGapAnalysisData(maybe.gapAnalysis);
      } catch (e) {
        // ignore
      }
    } catch (err) {
      setAnalysis("Error analyzing resume.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen pb-12 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <style>{`
          /* Premium glossy overlay and shimmer on hover for analysis cards */
          .card-gloss { position: relative; overflow: hidden; }
          .card-gloss::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.00));
            mix-blend-mode: overlay;
            z-index: 1;
          }
          .card-gloss::after {
            content: "";
            position: absolute;
            top: -120%;
            left: -40%;
            width: 180%;
            height: 260%;
            background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.18), rgba(255,255,255,0.06));
            transform: translateX(-100%) rotate(18deg);
            opacity: 0;
            transition: transform 900ms cubic-bezier(.2,.9,.2,1), opacity 450ms ease;
            z-index: 2;
          }
          .card-gloss:hover::after { transform: translateX(40%) rotate(18deg); opacity: 0.95; }
          /* subtle inner highlight */
          .card-gloss .card-inner-highlight {
            position: absolute; inset: 0; pointer-events: none; z-index: 0;
            background: radial-gradient(600px 200px at 10% 10%, rgba(255,255,255,0.02), transparent 20%);
            mix-blend-mode: screen; opacity: 0.9;
          }
          /* keep content above overlays */
          .card-gloss > * { position: relative; z-index: 3; }
        `}</style>
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
              <div className="job-card-wrapper max-w-7xl w-full px-6 mx-auto">
                <style>{`
                  .job-card-wrapper { display:flex; justify-content:center; }
                  .job-card { width: 100%; position: relative; border-radius: 9999px; overflow: visible; background: rgba(6,6,8,0.72); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.04); padding: 6px 12px; transition: transform .16s ease, box-shadow .16s ease; }
                  .job-card::before { content: ''; position: absolute; inset: -6px; border-radius: 9999px; background: linear-gradient(90deg, #0cc0df, #ffde59); filter: blur(18px); opacity: 0.22; pointer-events: none; z-index: -2; }
                  .job-card::after { content: ''; position: absolute; inset: 0; border-radius: 9999px; box-shadow: inset 0 2px 12px rgba(0,0,0,0.6); pointer-events: none; z-index: -1; }
                  .job-card .inner-rgb { position: absolute; inset: 0; border-radius: 9999px; background: linear-gradient(90deg, rgba(0,240,176,0.04), rgba(106,161,255,0.04), rgba(155,107,255,0.04)); pointer-events: none; z-index: 0; }
                  .job-card:hover { transform: translateY(-6px); box-shadow: 0 30px 80px rgba(2,6,23,0.7); }
                  .job-row { display: flex; gap: 16px; align-items: center; max-width: 100%; position: relative; }
                  .job-icon { width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; background: rgba(255,255,255,0.02); border-radius: 10px; border: 1px solid rgba(255,255,255,0.03); flex-shrink: 0; margin-left: 6px; }
                  /* thin, lengthy pill: small vertical padding, large horizontal padding to make a long pill */
                  .job-textarea { width: 100%; min-height: 34px; max-height: 260px; resize: none; display: block; background: transparent; color: #E8EFFA; font-size: 1rem; line-height: 1.4; border: none; outline: none; padding: 8px 88px 8px 14px; caret-color: #00e6a5; }
                  .job-textarea::placeholder { color: rgba(230,235,245,0.28); }
                  .job-helper { margin-top: 10px; font-size: 0.95rem; color: rgba(230,235,245,0.5); text-align: center; }
                  .job-clear { position: absolute; right: 76px; top: 50%; transform: translateY(-50%); background: transparent; border: none; color: rgba(230,235,245,0.6); padding: 6px 8px; border-radius:8px; cursor: pointer; font-size: 1.25rem; line-height: 1; }
                  .send-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 9999px; display:flex; align-items:center; justify-content:center; border: none; cursor: pointer; box-shadow: 0 8px 30px rgba(12,192,223,0.08); background: linear-gradient(90deg, #0cc0df, #ffde59); }
                  .send-btn:hover { transform: translateY(-52%); box-shadow: 0 14px 36px rgba(12,192,223,0.18); }
                  .send-btn[disabled] { opacity: 0.5; cursor: not-allowed; }
                  .send-btn:focus { outline: 3px solid rgba(12,192,223,0.18); outline-offset: 2px; }
                  .job-clear:hover { color: rgba(255,255,255,0.95); transform: translateY(-50%) translateX(-2px); }
                  .pill-handle { width: 44px; height: 6px; background: rgba(255,255,255,0.03); border-radius: 9999px; margin: 0 auto 10px; display: none; }
                  .analyze-btn { position: relative; display: inline-flex; align-items: center; gap: 10px; padding: 10px 36px; border-radius: 9999px; font-weight: 700; font-size: 1.02rem; color: #E6F0FA; background: linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.015) 50%, rgba(255,255,255,0.01) 100%); border: 1px solid rgba(255,255,255,0.06); cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 28px rgba(3,6,10,0.45); transition: transform .12s ease, background-position .6s ease, box-shadow .12s ease; background-size: 200% 100%; background-position: 0% 0%; }
                  .analyze-btn:hover { transform: translateY(-3px); background-position: 100% 0%; box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 18px 44px rgba(3,6,10,0.5); }
                  .analyze-btn svg { opacity: 0.95; transform: translateX(0); transition: transform .12s ease; }
                  .analyze-btn:hover svg { transform: translateX(4px); }
                  .analyze-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
                  @media (max-width: 640px) { .job-card-wrapper { padding: 0 16px; } .job-row { gap: 12px; } .job-icon { width: 40px; height: 40px; } .job-textarea { min-height: 48px; padding-right: 72px; } .analyze-btn { padding: 10px 22px; } .pill-handle { display: block; } }
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
                      onChange={e => { setJobRole(e.target.value); /* autosize via CSS by leaving rows and max-height */ }}
                      rows={1}
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

                    <button
                      type="button"
                      className="send-btn"
                      onClick={handleAnalyze}
                      disabled={loading || !jobRole.trim()}
                      aria-label="Send job description"
                      title="Send"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="#071018" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#071018"/></svg>
                      )}
                    </button>
                  </div>

                  {/* tip removed */}
                </div>
              </div>
            </div>

            {/* Analyze button replaced by send button inside pill */}
          </div>
        )}

        <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-16" />

        {/* Show loader while analyzing; show results and analysis sections only after analysis completes */}
        {loading && (
          <div className="mt-8 text-center text-lg text-blue-600">Analyzing your resume...</div>
        )}

        {analysis && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight">Analysis Results</h2>
            </div>

            {/* Analysis sections stacked below, responsive for mobile */}
      {/* Premium header removed per request - results appear below */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <SkillsAnalysis skills={skillsData ?? undefined} keywords={keywordsData ?? undefined} loading={loading} />
              </div>
              <div>
                <GapAnalysis gapAnalysis={gapAnalysisData ?? undefined} loading={loading} />
              </div>
            </div>

            {/* Recommendations separated below the two-column analysis */}
            <div className="mb-8">
              {/* normalize recommendations to array */}
              <Recommendations
                loading={loading}
                recommendations={
                  gapAnalysisData?.recommendations
                    ? Array.isArray(gapAnalysisData.recommendations)
                      ? gapAnalysisData.recommendations
                      : [String(gapAnalysisData.recommendations)]
                    : []
                }
              />
            </div>

            <div className="mt-8 p-6 bg-white rounded shadow text-gray-800">
              <h2 className="text-2xl font-semibold mb-4">Analysis Result</h2>
              <pre className="whitespace-pre-wrap break-words">{analysis}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
