"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VoiceInterview } from "@/components/interview/voice-interview"
import { PremiumInterview } from "@/components/interview/premium-interview"
import { Badge } from "@/components/ui/badge"
import { Mic, Video } from "lucide-react"

export default function MockInterviewPage() {
  const [activeTab, setActiveTab] = useState("voice")

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mock Interview
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Practice with AI-powered interviews tailored to your role. Get real-time feedback and improve your
            performance.
          </p>
        </div>

        {/* Interview Mode Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass mb-8">
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Voice Interview
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2" disabled>
              <Video className="h-4 w-4" />
              Voice + Camera
              <Badge variant="secondary" className="ml-2 text-xs">
                Premium
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="space-y-6">
            <VoiceInterview />
          </TabsContent>

          <TabsContent value="premium" className="space-y-6">
            <PremiumInterview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
