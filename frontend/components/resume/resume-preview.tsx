"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResumePreview() {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          Resume Preview
        </CardTitle>
        <CardDescription>Preview your uploaded resume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[8.5/11] bg-muted/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-medium">Resume Preview</p>
              <p className="text-sm text-muted-foreground">Upload a PDF to see preview</p>
            </div>
            <Button variant="outline" size="sm" className="glass bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download Sample
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
