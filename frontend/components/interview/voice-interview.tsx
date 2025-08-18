"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const mockQuestions = [
  {
    id: 1,
    question: "Tell me about yourself and your background.",
    type: "General",
    timestamp: "00:00",
  },
  {
    id: 2,
    question: "What interests you most about this role?",
    type: "Motivation",
    timestamp: "02:30",
  },
  {
    id: 3,
    question: "Describe a challenging project you've worked on recently.",
    type: "Technical",
    timestamp: "05:15",
  },
]

const mockTranscript = [
  {
    speaker: "AI",
    text: "Hello! I'm your AI interviewer. Let's start with some basic questions. Tell me about yourself and your background.",
    timestamp: "00:00",
  },
  {
    speaker: "You",
    text: "Hi, thank you for having me. I'm a full-stack developer with 5 years of experience...",
    timestamp: "00:05",
  },
]

const mockFeedback = [
  {
    category: "Communication",
    score: 85,
    feedback: "Clear and articulate responses. Good pace and tone.",
    color: "text-secondary",
  },
  {
    category: "Content Quality",
    score: 78,
    feedback: "Relevant examples provided. Could include more specific metrics.",
    color: "text-primary",
  },
  {
    category: "Confidence",
    score: 82,
    feedback: "Confident delivery with minimal filler words.",
    color: "text-accent",
  },
]

export function VoiceInterview() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [waveformBars, setWaveformBars] = useState(Array(20).fill(0))

  // Simulate waveform animation
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setWaveformBars(
          Array(20)
            .fill(0)
            .map(() => Math.random() * 100),
        )
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isRecording])

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Chat Interface */}
      <div className="space-y-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Interview Questions</CardTitle>
            <CardDescription>AI-generated questions tailored to your role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockQuestions.map((q, index) => (
              <div
                key={q.id}
                className={cn(
                  "p-4 rounded-lg border transition-all",
                  index === currentQuestion
                    ? "bg-primary/10 border-primary"
                    : index < currentQuestion
                      ? "bg-secondary/10 border-secondary"
                      : "bg-muted/10 border-border",
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={index === currentQuestion ? "default" : "outline"} className="text-xs">
                    {q.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{q.timestamp}</span>
                </div>
                <p className="font-medium">{q.question}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Transcript */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Live Transcript</CardTitle>
            <CardDescription>Real-time speech-to-text conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {mockTranscript.map((entry, index) => (
                <div key={index} className="flex gap-3">
                  <Badge variant={entry.speaker === "AI" ? "default" : "secondary"} className="text-xs shrink-0">
                    {entry.speaker}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm">{entry.text}</p>
                    <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Recording Interface */}
      <div className="space-y-6">
        {/* Recording Controls */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Voice Recording</CardTitle>
            <CardDescription>Click the microphone to start recording your response</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Waveform Visualization */}
            <div className="flex items-center justify-center gap-1 h-20">
              {waveformBars.map((height, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 bg-primary rounded-full transition-all duration-100",
                    isRecording ? "opacity-100" : "opacity-30",
                  )}
                  style={{ height: `${Math.max(4, height * 0.6)}px` }}
                />
              ))}
            </div>

            {/* Recording Button */}
            <Button
              size="lg"
              onClick={toggleRecording}
              className={cn(
                "w-20 h-20 rounded-full p-0 transition-all duration-300",
                isRecording ? "bg-destructive hover:bg-destructive/90 animate-pulse" : "bg-primary hover:bg-primary/90",
              )}
            >
              {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </Button>

            <p className="text-sm text-muted-foreground">
              {isRecording ? "Recording... Click to stop" : "Click to start recording"}
            </p>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="sm" className="glass bg-transparent">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={nextQuestion} disabled={currentQuestion >= mockQuestions.length - 1}>
                Next Question
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Feedback */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Performance Feedback</CardTitle>
            <CardDescription>AI analysis of your responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockFeedback.map((feedback, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{feedback.category}</span>
                  <span className={cn("font-bold", feedback.color)}>{feedback.score}%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div
                    className={cn("h-2 rounded-full transition-all", feedback.color.replace("text-", "bg-"))}
                    style={{ width: `${feedback.score}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
