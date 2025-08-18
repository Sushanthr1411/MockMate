"use client"
import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"


export function ResumeUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showAnalyzingOverlay, setShowAnalyzingOverlay] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === "application/pdf") {
      setUploadedFile(file)
      setIsAnalyzing(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  })

  const removeFile = () => {
    setUploadedFile(null)
    setIsAnalyzing(false)
    setShowAnalyzingOverlay(false)
  }

  // Simulate analysis with overlay
  const handleAnalyze = () => {
    setShowAnalyzingOverlay(true)
    setIsAnalyzing(true)
    setTimeout(() => {
      setShowAnalyzingOverlay(false)
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <>
      {showAnalyzingOverlay && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-2xl bg-black/60">
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-primary border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Upload className="h-12 w-12 text-secondary animate-bounce" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white drop-shadow-lg animate-pulse">Analyzing your resume...</h2>
          </div>
        </div>
      )}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Resume
          </CardTitle>
          <CardDescription>Upload your resume in PDF format for AI-powered analysis</CardDescription>
        </CardHeader>
        <CardContent>
          {!uploadedFile ? (
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
              )}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium">
                    {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">or click to browse files</p>
                </div>
                <Button variant="outline" className="glass bg-transparent">
                  Choose File
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 glass rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
                    View
                  </Button>
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2 text-primary">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                      <span className="text-sm">Analyzing...</span>
                    </div>
                  ) : (
                    <CheckCircle className="h-5 w-5 text-secondary" />
                  )}
                  <Button variant="ghost" size="sm" onClick={removeFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!isAnalyzing && (
                <div className="flex justify-center gap-4">
                  <Button onClick={handleAnalyze}>
                    Analyze Resume
                  </Button>
                </div>
              )}
            </div>
          )}
          {/* PDF Preview Modal */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-[900px] w-full h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Resume Preview</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-auto bg-black/80 rounded-lg p-4 flex items-center justify-center">
                {uploadedFile && (
                  <iframe
                    src={URL.createObjectURL(uploadedFile)}
                    title="Resume PDF Preview"
                    className="w-full h-full rounded-lg border"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  )
}
