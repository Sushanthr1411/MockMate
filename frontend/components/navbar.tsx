"use client"

import type React from "react"
import { useState, useEffect } from "react"

import Link from "next/link"
import ProfileDropdown from "@/components/profile/ProfileDropdown"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import type { User } from "firebase/auth"
import { app } from "@/lib/firebase"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Resume Analysis", href: "/resume-analysis" },
  { name: "Mock Interview", href: "/mock-interview" },
  { name: "Progress", href: "/progress" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (u) => {
  setUser(u as User | null)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-link focus-ring">
        Skip to main content
      </a>

      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass shadow-lg" : "bg-transparent",
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="relative w-full flex items-center min-h-16">
              {/* Logo and nav for desktop */}
              <div className="hidden md:flex w-full items-center">
                <div className="flex-shrink-0 z-10 pl-4">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 group focus-ring rounded-lg"
                    aria-label="MockMate home"
                  >
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      MockMate
                    </span>
                  </Link>
                </div>
                <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
                  <div className="flex gap-8 pointer-events-auto">
                    {navigation.map((item) => (
                      item.name === "Home" || item.name === "Contact" ? (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "text-sm font-medium transition-all duration-200 px-4 py-1 focus-ring rounded-md relative group",
                            pathname === item.href ? "text-primary" : "text-muted-foreground",
                          )}
                          aria-current={pathname === item.href ? "page" : undefined}
                        >
                          <span className="transition-colors duration-200 group-hover:text-primary group-hover:scale-105">
                            {item.name}
                          </span>
                          <span className="absolute left-1/2 -bottom-1 w-0 group-hover:w-3/4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 -translate-x-1/2" />
                        </Link>
                      ) : (
                        <button
                          key={item.name}
                          className={cn(
                            "text-sm font-medium transition-all duration-200 px-4 py-1 focus-ring rounded-md relative group bg-transparent border-none outline-none cursor-pointer",
                            pathname === item.href ? "text-primary" : "text-muted-foreground",
                          )}
                          aria-current={pathname === item.href ? "page" : undefined}
                          onClick={() => {
                            if (user) {
                              window.location.href = item.href
                            } else {
                              window.location.href = "/login"
                            }
                          }}
                        >
                          <span className="transition-colors duration-200 group-hover:text-primary group-hover:scale-105">
                            {item.name}
                          </span>
                          <span className="absolute left-1/2 -bottom-1 w-0 group-hover:w-3/4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 -translate-x-1/2" />
                        </button>
                      )
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 ml-auto z-10">
                  {user ? (
                    <ProfileDropdown user={user} />
                  ) : (
                    <Button size="sm" className="focus-ring bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md transition-all duration-200 hover:scale-105 hover:from-secondary hover:to-primary" asChild aria-label="Login">
                      <Link href="/login">Login</Link>
                    </Button>
                  )}
                </div>
              </div>
              {/* Logo for mobile */}
              <div className="md:hidden flex-shrink-0 z-10 pl-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 group focus-ring rounded-lg"
                  aria-label="MockMate home"
                >
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    MockMate
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="focus-ring"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden animate-fade-in" id="mobile-menu" onKeyDown={handleKeyDown}>
              <div className="px-2 pt-2 pb-3 space-y-1 glass rounded-lg mt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md transition-colors focus-ring",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button size="sm" className="w-full mt-2 focus-ring" asChild aria-label="Login">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
