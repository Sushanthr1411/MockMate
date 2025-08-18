"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"

interface SessionHistoryProps {
  timeRange: string
}

const mockSessions = [
  {
    id: "session-001",
    date: "2024-01-15",
    duration: "15 min",
    type: "Technical Interview",
    score: 88,
    improvement: "+5%",
    status: "completed",
  },
  {
    id: "session-002",
    date: "2024-01-12",
    duration: "12 min",
    type: "Behavioral Interview",
    score: 82,
    improvement: "+3%",
    status: "completed",
  },
  {
    id: "session-003",
    date: "2024-01-10",
    duration: "18 min",
    type: "General Interview",
    score: 79,
    improvement: "+8%",
    status: "completed",
  },
  {
    id: "session-004",
    date: "2024-01-08",
    duration: "14 min",
    type: "Technical Interview",
    score: 75,
    improvement: "+2%",
    status: "completed",
  },
]

export function SessionHistory({ timeRange }: SessionHistoryProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Recent Sessions
        </CardTitle>
        <CardDescription>Your interview practice history and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 glass rounded-lg">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{session.type}</Badge>
                    <span className="text-sm text-muted-foreground">{session.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-secondary" />
                      Score: {session.score}%
                    </div>
                    <span className="text-secondary">{session.improvement}</span>
                  </div>
                </div>
              </div>
              <Link href={`/session/${session.id}`}>
                <Button variant="outline" size="sm" className="glass bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View Report
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
