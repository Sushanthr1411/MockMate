"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { MessageSquare } from "lucide-react"

interface FillerWordsChartProps {
  timeRange: string
}

const mockData = {
  "1w": [
    { date: "Mon", fillers: 15 },
    { date: "Tue", fillers: 12 },
    { date: "Wed", fillers: 10 },
    { date: "Thu", fillers: 8 },
    { date: "Fri", fillers: 6 },
    { date: "Sat", fillers: 4 },
    { date: "Sun", fillers: 3 },
  ],
  "1m": [
    { date: "Week 1", fillers: 18 },
    { date: "Week 2", fillers: 12 },
    { date: "Week 3", fillers: 8 },
    { date: "Week 4", fillers: 4 },
  ],
  "3m": [
    { date: "Month 1", fillers: 20 },
    { date: "Month 2", fillers: 12 },
    { date: "Month 3", fillers: 5 },
  ],
}

const chartConfig = {
  fillers: {
    label: "Filler Words",
    color: "hsl(var(--accent))",
  },
}

export function FillerWordsChart({ timeRange }: FillerWordsChartProps) {
  const data = mockData[timeRange as keyof typeof mockData]

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-accent" />
          Filler Words Usage
        </CardTitle>
        <CardDescription>Reduction in filler words per interview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="fillers" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
