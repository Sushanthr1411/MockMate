"use client"

import { useState, useEffect } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { app } from "@/lib/firebase"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const auth = getAuth(app)
  const user = auth.currentUser
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const handleDeleteAccount = async () => {
    setDeleteLoading(true)
    setError("")
    try {
      const { deleteUser } = await import("firebase/auth")
      if (user) {
        await deleteUser(user)
        window.location.href = "/"
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete account.")
    }
    setDeleteLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      if (user) {
        await updateProfile(user, { displayName })
        window.location.href = "/"
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl glass">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile Settings</h2>
        <form onSubmit={handleSave} className="space-y-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg">
              {displayName ? displayName[0].toUpperCase() : (user?.email ? user.email[0].toUpperCase() : "U")}
            </div>
            <label htmlFor="displayName" className="block text-lg font-semibold mb-2 text-white">Profile Name</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/60 border-2 border-primary/40 text-white focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              placeholder="Enter your name"
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold shadow-lg hover:from-teal-600 hover:to-green-600 transition-colors" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
        <div className="mt-8">
          <Button
            type="button"
            size="lg"
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg hover:from-pink-600 hover:to-red-600 transition-colors"
            disabled={deleteLoading}
            onClick={handleDeleteAccount}
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </div>
    </div>
  )
}
