"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  // Get user from Firebase
  const [user, setUser] = React.useState<any>(null)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      import("firebase/auth").then(({ getAuth, onAuthStateChanged }) => {
        const auth = getAuth()
        onAuthStateChanged(auth, (u) => setUser(u))
      })
    }
  }, [])

  return (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 md:pt-16 lg:pt-20">
      {/* Enhanced animated gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
  <div className="absolute top-1/4 left-[10%] w-[32rem] h-[32rem] rounded-full blur-3xl animate-[meshGlow1_6s_ease-in-out_infinite] bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 opacity-40" />
  <div className="absolute top-1/2 right-[10%] w-[28rem] h-[28rem] rounded-full blur-3xl animate-[meshGlow2_8s_ease-in-out_infinite] bg-gradient-to-tr from-secondary/30 via-primary/30 to-accent/30 opacity-30" />
  <div className="absolute bottom-1/4 left-1/3 w-[24rem] h-[24rem] rounded-full blur-3xl animate-[meshGlow3_7s_ease-in-out_infinite] bg-gradient-to-bl from-accent/30 via-primary/30 to-secondary/30 opacity-30" />
      </div>
      <style jsx global>{`
        @keyframes meshGlow1 {
          0%, 100% { transform: scale(1) translateY(0); opacity: 0.4; }
          50% { transform: scale(1.15) translateY(-20px); opacity: 0.6; }
        }
        @keyframes meshGlow2 {
          0%, 100% { transform: scale(1) translateX(0); opacity: 0.3; }
          50% { transform: scale(1.1) translateX(30px); opacity: 0.5; }
        }
        @keyframes meshGlow3 {
          0%, 100% { transform: scale(1) translateY(0); opacity: 0.3; }
          50% { transform: scale(1.2) translateY(25px); opacity: 0.5; }
        }
      `}</style>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center w-full text-center">
        <div className="space-y-8">
          {/* Badge removed */}

          {/* Main heading */}
          <div className="space-y-4 animate-stagger-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight transition-colors duration-300 group-hover:text-primary">
              <span className="block group-hover:text-secondary transition-colors duration-300">Master Your Next</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent group-hover:from-accent group-hover:to-secondary transition-all duration-300">
                Interview with AI
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-muted-foreground leading-relaxed">
              Transform your interview performance with personalized AI coaching, real-time feedback, and comprehensive
              skill analysis designed for today's competitive job market.
            </p>
            <div className="pt-6 flex justify-center">
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold focus-ring bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg transition-transform duration-200 active:scale-95 active:shadow-xl hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
                aria-label="Start Free Interview"
                onClick={() => {
                  if (user) {
                    window.location.href = "/mock-interview"
                  } else {
                    window.location.href = "/login"
                  }
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="transition-colors duration-300 group-hover:text-white">Start Free Interview</span>
                  <span className="inline-block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <Play className="w-5 h-5" />
                  </span>
                </span>
                <span className="absolute inset-0 opacity-0 group-active:opacity-30 group-hover:opacity-20 bg-white transition-opacity duration-200 rounded-lg" />
                <span className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <span className="absolute right-0 top-0 w-8 h-8 rounded-full bg-accent opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-300" />
                  <span className="absolute left-0 bottom-0 w-8 h-8 rounded-full bg-secondary opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-300" />
                </span>
              </Button>
            {/* If there are other Get Started buttons, add similar logic here */}
            </div>
          </div>

          {/* CTA buttons removed */}

        </div>
      </div>
    </section>
  )
}
