"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "sales_person" | "showroom_manager" | "head_office"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  telegram_customer_id?: string
  showroom_code?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication - in real app, this would call your API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on role
    const mockUser: User = {
      id: "1",
      name: role === "sales_person" ? "John Sales" : role === "showroom_manager" ? "Jane Manager" : "Mike Executive",
      email,
      role,
      telegram_customer_id: role === "sales_person" ? "sales_123" : undefined,
      showroom_code: role === "showroom_manager" ? "SR001" : undefined,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
