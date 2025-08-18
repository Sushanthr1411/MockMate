"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  PrinterIcon as Print,
  Share2,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Target,
} from "lucide-react"

interface SessionReportPageProps {
  params: {
    id: string
  }
}

const mockSessionData = {
  id: "session-001",
  date: "January 15, 2024",
  duration: "15 minutes",
  type: "Technical Interview",
  overallScore: 88,
  improvement: "+5%",
  questions: 8,
  strengths: [
    "Clear and articulate communication",
    "Strong technical knowledge demonstration",
    "Good use of specific examples",
    "Confident body language",
    "Appropriate pace of speech",
  ],
  weaknesses: [
    "Occasional use of filler words",
    "Could provide more quantified results",
    "Some answers could be more concise",
  ],
  recommendations: [
    "Practice eliminating filler words like 'um' and 'uh'",
    "Prepare specific metrics and numbers for your achievements",
    "Use the STAR method to structure your responses more effectively",
    "Practice mock interviews to build confidence in technical discussions",
  ],
  metrics: {
    speechClarity: 92,
    confidence: 85,
    technicalAccuracy: 90,
    communication: 88,
    responseTime: 82,
  },
}

export default function SessionReportPage({ params }: SessionReportPageProps) {
  const session = mockSessionData

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Simulate PDF download
    console.log("Downloading report...")
  }

  const handleShare = () => {
    // Simulate sharing functionality
    console.log("Sharing report...")
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Interview Report</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {session.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {session.duration}
              </div>
              <Badge variant="outline">{session.type}</Badge>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" onClick={handlePrint} className="glass bg-transparent">
              <Print className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="glass bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="glass bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="glass mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">{session.overallScore}%</div>
              <div className="space-y-2">
                <p className="text-xl font-semibold">Overall Performance</p>
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  <span className="text-secondary font-medium">{session.improvement} improvement</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="glass mb-8">
          <CardHeader>
            <CardTitle>Performance Breakdown</CardTitle>
            <CardDescription>Detailed analysis of your interview performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(session.metrics).map(([metric, score]) => (
              <div key={metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{metric.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className="font-bold text-primary">{score}%</span>
                </div>
                <Progress value={score} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <CheckCircle className="h-5 w-5" />
                Strengths
              </CardTitle>
              <CardDescription>What you did well in this interview</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {session.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-500">
                <AlertTriangle className="h-5 w-5" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>Opportunities to enhance your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {session.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>Action items to improve your next interview performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {session.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-4 glass rounded-lg">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
