"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, Target, Clock, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressOverviewProps {
  timeRange: string
}

const mockStats = {
  "1w": {
    totalSessions: 3,
    avgScore: 78,
    improvement: 12,
    totalTime: 45,
  },
  "1m": {
    totalSessions: 12,
    avgScore: 82,
    improvement: 8,
    totalTime: 180,
  },
  "3m": {
    totalSessions: 35,
    avgScore: 85,
    improvement: 15,
    totalTime: 525,
  },
}

export function ProgressOverview({ timeRange }: ProgressOverviewProps) {
  const stats = mockStats[timeRange as keyof typeof mockStats]

  const getTrendIcon = (improvement: number) => {
    if (improvement > 0) return <TrendingUp className="h-4 w-4 text-secondary" />
    if (improvement < 0) return <TrendingDown className="h-4 w-4 text-destructive" />
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }

  const getTrendColor = (improvement: number) => {
    if (improvement > 0) return "text-secondary"
    if (improvement < 0) return "text-destructive"
    return "text-muted-foreground"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSessions}</div>
          <p className="text-xs text-muted-foreground">interviews completed</p>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgScore}%</div>
          <div className="flex items-center text-xs">
            {getTrendIcon(stats.improvement)}
            <span className={cn("ml-1", getTrendColor(stats.improvement))}>
              {stats.improvement > 0 ? "+" : ""}
              {stats.improvement}% from last period
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTime}m</div>
          <p className="text-xs text-muted-foreground">total practice time</p>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Improvement</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={cn("text-2xl font-bold", getTrendColor(stats.improvement))}>
            {stats.improvement > 0 ? "+" : ""}
            {stats.improvement}%
          </div>
          <p className="text-xs text-muted-foreground">overall progress</p>
        </CardContent>
      </Card>
    </div>
  )
}
