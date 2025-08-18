  "use client"
import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "@/lib/firebase"

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setError("");
      // Redirect to home page
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Login failed.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl glass">
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">Sign In</h1>
        <form onSubmit={handleLogin} className="space-y-8">
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
            <div className="relative">
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
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="mt-8 text-center text-muted-foreground text-base">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary font-semibold hover:underline">Sign Up</Link>
        </div>
        <div className="mt-8 text-center">
          <Button asChild className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold shadow-lg hover:from-teal-600 hover:to-green-600 transition-all duration-200">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
