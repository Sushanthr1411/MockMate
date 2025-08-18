"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profileName, setProfileName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { getAuth, createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth")
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (userCredential.user && profileName) {
        await updateProfile(userCredential.user, { displayName: profileName })
      }
      window.location.href = "/"
    } catch (err: any) {
      setError(err.message || "Signup failed.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl glass">
        <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">Create your MockMate account</h2>
        <form onSubmit={handleSignup} className="space-y-8">
          <div>
            <label htmlFor="profileName" className="block text-base font-semibold mb-2 text-white">Profile Name</label>
            <input
              id="profileName"
              type="text"
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/60 border-2 border-primary/40 text-white focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base font-semibold mb-2 text-white">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/60 border-2 border-primary/40 text-white focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative flex flex-col">
            <label htmlFor="password" className="block text-base font-semibold mb-2 text-white">Password</label>
            <div className="relative flex items-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/60 border-2 border-primary/40 text-white focus:outline-none focus:ring-2 focus:ring-primary text-lg pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary font-bold text-sm bg-transparent hover:text-secondary focus:outline-none"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg hover:from-secondary hover:to-primary transition-all duration-200" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <div className="mt-8 text-center text-muted-foreground text-base">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-semibold hover:underline">Login</Link>
        </div>
      </div>
    </div>
  )
}
