import { ResumeUpload } from "@/components/resume/resume-upload"
import { SkillsAnalysis } from "@/components/resume/skills-analysis"
import { GapAnalysis } from "@/components/resume/gap-analysis"
import { ResumePreview } from "@/components/resume/resume-preview"

export default function ResumeAnalysisPage() {
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
        <div className="w-full mb-16">
          <ResumeUpload />
        </div>
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
      </div>
      {/* Floating action button for Analyze Resume */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-secondary transition-all font-semibold text-lg">
          Analyze Resume
        </button>
      </div>
    </div>
  )
}
