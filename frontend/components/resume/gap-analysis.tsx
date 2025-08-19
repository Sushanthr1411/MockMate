"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Target, Plus } from "lucide-react"

const gapAnalysis = {
  matching: ["JavaScript", "React", "Node.js", "Leadership", "Communication"],
  missing: ["Python", "AWS", "Docker", "Kubernetes", "Machine Learning"],
  recommendations: [
    "Consider adding Python experience to your skillset for backend development",
    "AWS certification would strengthen your cloud computing profile",
    "Docker and Kubernetes skills are highly valued for DevOps roles",
    "Machine Learning knowledge could set you apart in tech roles",
  ],
}

export function GapAnalysis() {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeGap = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Gap Analysis
        </CardTitle>
        <CardDescription>Compare your skills against job requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job description input */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Job Description</label>
          <Textarea
            placeholder="Paste the job description here to analyze skill gaps..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[100px] glass bg-transparent w-full max-w-4xl mx-auto"
          />
          <Button onClick={analyzeGap} disabled={!jobDescription || isAnalyzing} className="w-full">
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Analyze Gap
              </>
            )}
          </Button>
        </div>

        {/* Analysis results */}
        <div className="space-y-4">
          {/* Matching skills */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-secondary">
              <CheckCircle className="h-4 w-4" />
              Matching Skills ({gapAnalysis.matching.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {gapAnalysis.matching.map((skill) => (
                <Badge key={skill} variant="default" className="bg-secondary/20 text-secondary border-secondary/30">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Missing skills */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Skills to Develop ({gapAnalysis.missing.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {gapAnalysis.missing.map((skill) => (
                <Badge key={skill} variant="destructive" className="bg-destructive/20 border-destructive/30">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-semibold mb-3">Recommendations</h4>
            <div className="space-y-2">
              {gapAnalysis.recommendations.map((rec, index) => (
                <div key={index} className="p-3 glass rounded-lg text-sm">
                  <p>{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
