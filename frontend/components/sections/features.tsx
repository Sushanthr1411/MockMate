"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, TrendingUp, Zap, Target, Shield } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "AI-powered analysis of your resume with personalized recommendations and skill gap identification.",
    href: "/resume-analysis",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    description: "Practice with realistic AI interviews tailored to your industry and role with real-time feedback.",
    href: "/mock-interview",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics and performance insights.",
    href: "/progress",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

const benefits = [
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get immediate, actionable feedback on your responses to improve faster.",
  },
  {
    icon: Target,
    title: "Personalized Coaching",
    description: "AI adapts to your specific needs and career goals for targeted improvement.",
  },
  {
    icon: Shield,
    title: "Confidence Building",
    description: "Build unshakeable confidence through repeated practice in a safe environment.",
  },
]

export function Features() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main features */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ace Your Interview
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive AI-powered platform provides all the tools and insights you need to excel in any interview
            scenario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const animationClass = `animate-stagger-${index + 1}`
            return (
              <div
                key={feature.title}
                className={`relative group rounded-3xl p-8 bg-gradient-to-br from-black/60 via-zinc-900/60 to-black/40 border border-transparent hover:border-primary/40 shadow-xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${animationClass}`}
                tabIndex={0}
                style={{ minHeight: '340px' }}
              >
                {/* Gradient border ring */}
                <div className="absolute -inset-1 rounded-3xl pointer-events-none border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-primary group-hover:via-secondary group-hover:to-accent group-hover:opacity-60 transition-all duration-300" />
                {/* Icon with glass background and glow */}
                <div className={`mx-auto mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 shadow-lg group-hover:shadow-primary/30 transition-all duration-300`}>
                  <Icon className={`h-8 w-8 ${feature.color} drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`} aria-hidden="true" />
                </div>
                {/* Title */}
                <div className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300 drop-shadow-lg text-center">
                  {feature.title}
                </div>
                {/* Description */}
                <div className="text-base text-zinc-300 mb-8 group-hover:text-secondary/80 transition-colors duration-300 text-center">
                  {feature.description}
                </div>
                {/* CTA Button */}
                <div className="absolute bottom-8 left-0 w-full flex justify-center">
                            <Button
                              variant="outline"
                              className="rounded-full px-6 py-2 font-semibold bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 text-white shadow-lg focus-ring transition-all duration-300 group-hover:bg-primary group-hover:text-accent group-hover:scale-105 group-hover:shadow-xl"
                              aria-label={`Get started with ${feature.title}`}
                              onClick={async () => {
                                if (typeof window !== "undefined") {
                                  let isLoggedIn = false;
                                  try {
                                    const { getAuth, onAuthStateChanged } = await import("firebase/auth");
                                    const auth = getAuth();
                                    isLoggedIn = !!auth.currentUser;
                                    if (!isLoggedIn) {
                                      // Wait for auth state to resolve in case of slow load
                                      await new Promise((resolve) => {
                                        onAuthStateChanged(auth, (u) => {
                                          isLoggedIn = !!u;
                                          resolve(null);
                                        });
                                      });
                                    }
                                  } catch {}
                                  if (isLoggedIn) {
                                    window.location.href = feature.href;
                                  } else {
                                    window.location.href = "/login";
                                  }
                                }
                              }}
                            >
                              <span className="flex items-center gap-2">
                                Get Started
                                <span className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                  <Zap className="w-4 h-4" />
                                </span>
                              </span>
                            </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Minimal benefits section for MockMate */}
        <div className="py-20">
          <div className="text-center animate-slide-up mb-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">MockMate?</span>
            </h3>
            <p className="text-lg text-muted-foreground mx-auto" style={{maxWidth: '900px', whiteSpace: 'normal'}}>
              Experience the future of interview preparation with cutting-edge AI technology.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="flex flex-col items-center justify-center text-center px-4">
                  <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/40 bg-black/60">
                    <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-lg font-bold mb-2 text-white">
                    {benefit.title}
                  </div>
                  <div className="text-base text-muted-foreground">
                    {benefit.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* How It Works section */}
        <div className="mt-24 animate-slide-up">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with MockMate in just a few simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
            {/* Step 1: Upload Resume */}
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 shadow-lg">
              <FileText className="h-10 w-10 text-primary mb-4 drop-shadow-lg" />
              <div className="text-xl font-bold mb-2 text-primary">Upload Resume</div>
              <div className="text-base text-muted-foreground">Start by uploading your resume for instant AI analysis and personalized recommendations.</div>
            </div>
            {/* Step 2: Take Mock Interview */}
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-secondary/20 via-primary/20 to-accent/20 shadow-lg">
              <MessageSquare className="h-10 w-10 text-secondary mb-4 drop-shadow-lg" />
              <div className="text-xl font-bold mb-2 text-secondary">Take Mock Interview</div>
              <div className="text-base text-muted-foreground">Practice with realistic AI-powered interviews tailored to your role and industry.</div>
            </div>
            {/* Step 3: Get Feedback */}
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-accent/20 via-primary/20 to-secondary/20 shadow-lg">
              <Zap className="h-10 w-10 text-accent mb-4 drop-shadow-lg" />
              <div className="text-xl font-bold mb-2 text-accent">Get Feedback</div>
              <div className="text-base text-muted-foreground">Receive instant, actionable feedback and tips to improve your interview performance.</div>
            </div>
            {/* Step 4: Track Progress */}
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 shadow-lg">
              <TrendingUp className="h-10 w-10 text-primary mb-4 drop-shadow-lg" />
              <div className="text-xl font-bold mb-2 text-primary">Track Progress</div>
              <div className="text-base text-muted-foreground">Monitor your growth over time with detailed analytics and performance insights.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
