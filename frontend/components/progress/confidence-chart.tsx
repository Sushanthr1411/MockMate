"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

interface ConfidenceChartProps {
  timeRange: string
}

const mockData = {
  "1w": [
    { date: "Mon", confidence: 65 },
    { date: "Tue", confidence: 68 },
    { date: "Wed", confidence: 72 },
    { date: "Thu", confidence: 78 },
    { date: "Fri", confidence: 82 },
    { date: "Sat", confidence: 85 },
    { date: "Sun", confidence: 88 },
  ],
  "1m": [
    { date: "Week 1", confidence: 62 },
    { date: "Week 2", confidence: 70 },
    { date: "Week 3", confidence: 78 },
    { date: "Week 4", confidence: 85 },
  ],
  "3m": [
    { date: "Month 1", confidence: 60 },
    { date: "Month 2", confidence: 75 },
    { date: "Month 3", confidence: 85 },
  ],
}

const chartConfig = {
  confidence: {
    label: "Confidence Level",
    color: "hsl(var(--secondary))",
  },
}

export function ConfidenceChart({ timeRange }: ConfidenceChartProps) {
  const data = mockData[timeRange as keyof typeof mockData]

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-secondary" />
          Confidence Index
        </CardTitle>
        <CardDescription>Your confidence level progression</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="confidence"
                stroke="var(--color-secondary)"
                fill="var(--color-secondary)"
                fillOpacity={0.2}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
