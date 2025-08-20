"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Lightbulb } from "lucide-react"

interface RecommendationsProps {
  recommendations?: string[];
  loading?: boolean;
}

export function Recommendations({ recommendations, loading }: RecommendationsProps) {
  const recs = recommendations && recommendations.length ? recommendations : [];

  return (
  <Card className="glass transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl card-entrance card-gloss">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Recommendations
        </CardTitle>
        <CardDescription>Personalized steps to improve your fit for the role</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="card-inner-highlight" aria-hidden />
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse" />
            <div className="h-4 w-1/2 bg-muted rounded-md animate-pulse" />
          </div>
        ) : recs.length ? (
          <div className="space-y-3">
            {recs.map((r, i) => (
              <div key={i} className="p-3 glass rounded-lg text-sm">
                <p>{r}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>No recommendations available.</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
