import { useState, useEffect } from "react"
import { getAuth, signOut } from "firebase/auth"
import { app } from "@/lib/firebase"

export default function ProfileDropdown({ user }: { user: any }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".profile-dropdown")) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick)
    }
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])
  return (
    <div className="relative profile-dropdown">
      <button
        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg focus-ring"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open profile menu"
      >
        {user.displayName ? user.displayName[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : "U")}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-black/95 rounded-2xl shadow-2xl p-6 z-50">
          <div className="flex flex-col items-center mb-4">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl mb-2">
              {user.displayName ? user.displayName[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : "U")}
            </div>
            <div className="text-base font-semibold text-white">{user.displayName || "No Name Set"}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
          <a
            href="/profile"
            className="block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold hover:from-teal-600 hover:to-green-600 transition-colors mb-2 text-center shadow-lg"
            onClick={() => setOpen(false)}
          >
            Profile Settings
          </a>
          <button
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-pink-600 hover:to-red-600 transition-colors shadow-lg"
            onClick={() => { setOpen(false); signOut(getAuth(app)); window.location.href = "/"; }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
