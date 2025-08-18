import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Video, Eye, HandIcon as Gesture, Sparkles, Lock } from "lucide-react"

export function PremiumInterview() {
  return (
    <div className="space-y-8">
      {/* Premium Feature Banner */}
      <Card className="glass border-primary/30">
        <CardContent className="p-8 text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4 mr-2" />
            Premium Feature – Coming Soon
          </div>
          <h3 className="text-2xl font-bold">Voice + Camera Interview</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of interview preparation with advanced AI that analyzes your eye contact, gestures,
            and body language in addition to your verbal responses.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Video Preview (Disabled) */}
        <div className="space-y-6">
          <Card className="glass opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Interview
                <Lock className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
              <CardDescription>Advanced AI analysis of visual cues and body language</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Grayed out video preview */}
              <div className="aspect-video bg-muted/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Camera Preview</p>
                    <p className="text-sm text-muted-foreground">Under Development</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass opacity-60">
            <CardHeader>
              <CardTitle>Visual Analysis</CardTitle>
              <CardDescription>Real-time feedback on non-verbal communication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/10">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-muted-foreground">Eye Contact Analysis</p>
                  <p className="text-sm text-muted-foreground">Track engagement and confidence</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/10">
                <Gesture className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-muted-foreground">Gesture Recognition</p>
                  <p className="text-sm text-muted-foreground">Analyze hand movements and posture</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Features */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Premium Features</CardTitle>
              <CardDescription>Advanced AI capabilities coming soon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Eye Contact Tracking</p>
                    <p className="text-sm text-muted-foreground">
                      Measure and improve your eye contact patterns during interviews
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Posture Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      Get feedback on your sitting posture and body positioning
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Facial Expression Recognition</p>
                    <p className="text-sm text-muted-foreground">
                      Analyze confidence levels through facial expressions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Hand Gesture Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      Optimize your hand movements for professional presentation
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-primary/30">
            <CardContent className="p-6 text-center space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/30">Early Access</Badge>
              <h4 className="font-semibold">Be the First to Know</h4>
              <p className="text-sm text-muted-foreground">
                Join our waitlist to get early access to premium features when they launch.
              </p>
              <Button className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Join Waitlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
