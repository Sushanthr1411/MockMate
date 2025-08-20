"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Clipboard } from "lucide-react"

const defaultExtractedSkills = [
  { name: "JavaScript", level: 90, category: "Technical" },
  { name: "React", level: 85, category: "Technical" },
  { name: "Node.js", level: 80, category: "Technical" },
  { name: "TypeScript", level: 75, category: "Technical" },
  { name: "Leadership", level: 70, category: "Soft Skills" },
  { name: "Communication", level: 85, category: "Soft Skills" },
  { name: "Problem Solving", level: 90, category: "Soft Skills" },
  { name: "Project Management", level: 65, category: "Management" },
]

const defaultKeywords = [
  "Full Stack Developer",
  "Agile Methodology",
  "REST APIs",
  "Database Design",
  "Team Collaboration",
  "Code Review",
  "CI/CD",
  "Cloud Computing",
]
interface SkillsAnalysisProps {
  skills?: { name: string; level?: number; category?: string }[];
  keywords?: string[];
  loading?: boolean;
}

export function SkillsAnalysis({ skills, keywords, loading }: SkillsAnalysisProps) {
  const extractedSkills = skills && skills.length ? skills : defaultExtractedSkills;
  const keywordsList = keywords && keywords.length ? keywords : defaultKeywords;

  return (
  <Card className="glass transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl card-entrance card-gloss">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Skills Analysis</span>
        </CardTitle>
        <CardDescription>AI-extracted skills and keywords from your resume</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="card-inner-highlight" aria-hidden />
        {/* Skills with levels */}
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 w-3/5 bg-muted rounded-md animate-pulse" />
            <div className="h-4 w-2/5 bg-muted rounded-md animate-pulse" />
          </div>
        ) : (
        <div>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-secondary" />
            Skill Proficiency
          </h4>
          <div className="space-y-4">
            {extractedSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skill.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{(skill.level ?? 75)}%</span>
                </div>
                <Progress value={skill.level ?? 75} className="h-2 transition-all duration-700 ease-out" />
              </div>
            ))}
          </div>
          </div>
        )}

        {/* Keywords */}
        <div>
          <h4 className="font-semibold mb-4">Key Terms & Technologies</h4>
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-wrap gap-2">
              {keywordsList.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="glass">
                  {keyword}
                </Badge>
              ))}
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/6 text-sm hover:bg-white/10 transition"
              onClick={() => {
                try { navigator.clipboard.writeText(keywordsList.join(', ')); }
                catch (e) {}
              }}
              aria-label="Copy keywords"
              title="Copy keywords"
            >
              <Clipboard className="h-4 w-4" /> Copy
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
