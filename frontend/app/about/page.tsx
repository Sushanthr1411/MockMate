import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Target, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">About Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering professionals to excel in their career journey through AI-powered interview preparation
          </p>
        </div>

        {/* Profile Card */}
        <Card className="glass mb-12">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0">
                <img
                  src="/ai-interview-coach-headshot.png"
                  alt="AI Interview Coach"
                  className="w-48 h-48 rounded-full object-cover border-4 border-primary/20"
                />
              </div>
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">InterviewAI Pro Team</h2>
                  <p className="text-lg text-muted-foreground">AI-Powered Career Development Specialists</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary">AI Technology</Badge>
                  <Badge variant="secondary">Career Coaching</Badge>
                  <Badge variant="secondary">Interview Preparation</Badge>
                  <Badge variant="secondary">Professional Development</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We are a team of experienced career coaches, AI researchers, and technology professionals dedicated to
                  revolutionizing interview preparation. Our mission is to democratize access to high-quality career
                  coaching through cutting-edge artificial intelligence.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="glass text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To empower every professional with the confidence and skills needed to excel in their career journey
                through personalized AI coaching.
              </p>
            </CardContent>
          </Card>

          <Card className="glass text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the world's leading platform for AI-powered career development, making professional success
                accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <Card className="glass text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Innovation, accessibility, and genuine care for our users' professional growth drive everything we do.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Our Story
            </CardTitle>
            <CardDescription>How InterviewAI Pro came to be</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              InterviewAI Pro was born from a simple observation: while interview skills are crucial for career success,
              access to quality coaching remains limited and expensive. Our founders, having experienced both sides of
              the interview table as candidates and hiring managers, recognized the need for a more accessible solution.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Combining expertise in artificial intelligence, natural language processing, and career development, we
              created a platform that provides personalized, real-time feedback on interview performance. Our AI
              analyzes speech patterns, content quality, and communication effectiveness to deliver insights that were
              previously only available through expensive one-on-one coaching.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we're proud to serve thousands of professionals worldwide, helping them build confidence, improve
              their interview skills, and achieve their career goals. Our commitment to continuous innovation ensures
              that our platform evolves with the changing landscape of professional development.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
