"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp } from "lucide-react"

const extractedSkills = [
  { name: "JavaScript", level: 90, category: "Technical" },
  { name: "React", level: 85, category: "Technical" },
  { name: "Node.js", level: 80, category: "Technical" },
  { name: "TypeScript", level: 75, category: "Technical" },
  { name: "Leadership", level: 70, category: "Soft Skills" },
  { name: "Communication", level: 85, category: "Soft Skills" },
  { name: "Problem Solving", level: 90, category: "Soft Skills" },
  { name: "Project Management", level: 65, category: "Management" },
]

const keywords = [
  "Full Stack Developer",
  "Agile Methodology",
  "REST APIs",
  "Database Design",
  "Team Collaboration",
  "Code Review",
  "CI/CD",
  "Cloud Computing",
]

export function SkillsAnalysis() {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Skills Analysis
        </CardTitle>
        <CardDescription>AI-extracted skills and keywords from your resume</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skills with levels */}
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
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div>
          <h4 className="font-semibold mb-4">Key Terms & Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="glass">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
