"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Mic } from "lucide-react"

interface SpeechClarityChartProps {
  timeRange: string
}

const mockData = {
  "1w": [
    { date: "Mon", clarity: 72 },
    { date: "Tue", clarity: 75 },
    { date: "Wed", clarity: 78 },
    { date: "Thu", clarity: 82 },
    { date: "Fri", clarity: 85 },
    { date: "Sat", clarity: 88 },
    { date: "Sun", clarity: 90 },
  ],
  "1m": [
    { date: "Week 1", clarity: 70 },
    { date: "Week 2", clarity: 75 },
    { date: "Week 3", clarity: 82 },
    { date: "Week 4", clarity: 88 },
  ],
  "3m": [
    { date: "Month 1", clarity: 68 },
    { date: "Month 2", clarity: 78 },
    { date: "Month 3", clarity: 88 },
  ],
}

const chartConfig = {
  clarity: {
    label: "Speech Clarity",
    color: "hsl(var(--primary))",
  },
}

export function SpeechClarityChart({ timeRange }: SpeechClarityChartProps) {
  const data = mockData[timeRange as keyof typeof mockData]

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          Speech Clarity Trend
        </CardTitle>
        <CardDescription>Your speech clarity improvement over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="clarity"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: "var(--color-primary)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "var(--color-primary)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
