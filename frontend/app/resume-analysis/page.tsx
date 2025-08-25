"use client"
import { useState } from "react";
import { ResumeUpload } from "@/components/resume/resume-upload";
import { SkillsAnalysis } from "@/components/resume/skills-analysis";
import { GapAnalysis } from "@/components/resume/gap-analysis";
import { Recommendations } from "@/components/resume/recommendations";
import { Star, Upload } from "lucide-react";
export default function ResumeAnalysisPage() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [uploadedFileObj, setUploadedFileObj] = useState<File | null>(null);
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
    // start spinner immediately when the user clicks Send
    setLoading(true);
    setAnalysis(null);
    setSkillsData(null);
    setGapAnalysisData(null);
    setKeywordsData(null);

    // validate inputs; if missing, stop loading so spinner doesn't hang
    if (!jobRole) {
      setLoading(false);
      return;
    }
    if (!resumeText && !uploadedFileObj) {
      // no extracted text and no file to upload
      setLoading(false);
      return;
    }

    try {
      let resp: Response;
      if (uploadedFileObj) {
        const form = new FormData();
        form.append('file', uploadedFileObj);
        form.append('jobRole', jobRole || '');
        resp = await fetch('/api/analyze-resume', { method: 'POST', body: form });
      } else {
        resp = await fetch('/api/analyze-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeText, jobRole }),
        });
      }

      const payload = await resp.json().catch(() => null);
      const result = payload?.result ?? payload ?? null;

      if (!resp.ok) {
        const msg = result?.error || result?.raw?.error || JSON.stringify(payload);
        setAnalysis(`Error analyzing resume: ${msg}`);
      } else {
        const analysisText = result?.analysisText ?? result?.text ?? (typeof result === 'string' ? result : JSON.stringify(result));
        setAnalysis(analysisText);
        setSkillsData(result?.skills ?? []);
        setKeywordsData(result?.keywords ?? []);
        setGapAnalysisData(result?.gapAnalysis ?? null);
      }
    } catch (err) {
      setAnalysis('Error analyzing resume.');
    } finally {
      setLoading(false);
    }
  }

  // Download the analysis text as a .txt file
  function handleDownload() {
    if (!analysis) return;
    const blob = new Blob([analysis], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-analysis.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <style>{`
          /* small card gloss for results */
          .card-gloss { position: relative; overflow: hidden; }
          .card-gloss > * { position: relative; z-index: 2; }
        `}</style>

        <div className="text-center space-y-4 mb-16 mt-32">
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Resume Analysis</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Upload your resume to get AI-powered insights, skill analysis, and personalized recommendations.</p>
        </div>

        {loading && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-2xl bg-black/60">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 border-8 border-primary border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center"><Upload className="h-12 w-12 text-secondary" /></div>
              </div>
              <h2 className="text-3xl font-bold text-white">Analyzing your resume...</h2>
            </div>
          </div>
        )}

        <div className="w-full mb-8">
          <ResumeUpload onResumeExtracted={text => { setResumeText(text); setShowJobInput(true); }} onFileSelected={(f) => { setUploadedFileObj(f); }} />
        </div>

        {showJobInput && (
          <div className="flex flex-col items-center mt-12">
            <h2 className="text-3xl font-extrabold mb-6 text-white">Job Description</h2>
            <div className="w-full max-w-4xl px-6">
              <div className="relative bg-[rgba(6,6,8,0.72)] rounded-full p-3">
                <textarea
                  aria-label="Job description"
                  placeholder="Paste the job description here or type a short summary..."
                  className="w-full min-h-[44px] max-h-[260px] bg-transparent resize-none text-white pl-4 pr-20 py-2 outline-none"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  onInput={autoExpand}
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full" onClick={handleAnalyze} disabled={loading || !jobRole.trim()} aria-label="Send">
                  {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="#071018" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#071018"/></svg>}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full my-12" />

        {analysis && (
          <>
            <div className="text-center mb-8"><h2 className="text-2xl font-semibold tracking-tight">Analysis Results</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <SkillsAnalysis skills={skillsData ?? undefined} keywords={keywordsData ?? undefined} loading={loading} />
              <GapAnalysis gapAnalysis={gapAnalysisData ?? undefined} loading={loading} />
            </div>
            <div className="mb-8">
              <Recommendations loading={loading} recommendations={gapAnalysisData?.recommendations ? (Array.isArray(gapAnalysisData.recommendations) ? gapAnalysisData.recommendations : [String(gapAnalysisData.recommendations)]) : []} />
            </div>

            <div className="mt-8 p-6 bg-white rounded shadow text-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Analysis Result</h2>
                <button onClick={handleDownload} className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white text-sm font-medium shadow-md">Download</button>
              </div>
              <pre className="whitespace-pre-wrap break-words">{analysis}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
