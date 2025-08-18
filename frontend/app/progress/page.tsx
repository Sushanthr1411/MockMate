"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProgressOverview } from "@/components/progress/progress-overview"
import { SpeechClarityChart } from "@/components/progress/speech-clarity-chart"
import { FillerWordsChart } from "@/components/progress/filler-words-chart"
import { ConfidenceChart } from "@/components/progress/confidence-chart"
import { SessionHistory } from "@/components/progress/session-history"
import { TrendingUp, Calendar, Target, Award } from "lucide-react"

const timeRanges = [
  { label: "1 Week", value: "1w" },
  { label: "1 Month", value: "1m" },
  { label: "3 Months", value: "3m" },
]

export default function ProgressPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("1m")

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Progress Dashboard
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">Track your interview performance and improvement over time</p>
          </div>

          {/* Time Range Filters */}
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={selectedTimeRange === range.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeRange(range.value)}
                  className={selectedTimeRange !== range.value ? "glass bg-transparent" : ""}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Overview Cards */}
        <ProgressOverview timeRange={selectedTimeRange} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SpeechClarityChart timeRange={selectedTimeRange} />
          <ConfidenceChart timeRange={selectedTimeRange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <FillerWordsChart timeRange={selectedTimeRange} />
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Achievements
              </CardTitle>
              <CardDescription>Your interview milestones and badges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 glass rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="default" className="mb-2">
                    First Interview
                  </Badge>
                  <p className="text-xs text-muted-foreground">Completed your first mock interview</p>
                </div>
                <div className="text-center p-4 glass rounded-lg">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    Improving
                  </Badge>
                  <p className="text-xs text-muted-foreground">Showed consistent improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session History */}
        <SessionHistory timeRange={selectedTimeRange} />
      </div>
    </div>
  )
}
