"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
    name: string
    email: string
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token")
            const storedUser = localStorage.getItem("user")

            if (token && storedUser) {
                try {
                    setUser(JSON.parse(storedUser))
                    setIsAuthenticated(true)
                } catch (e) {
                    console.error("Error parsing user data", e)
                    logout()
                }
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
            setIsLoading(false)
        }

        checkAuth()
        // Listen for storage events to sync across tabs or updates
        window.addEventListener("storage", checkAuth)
        return () => window.removeEventListener("storage", checkAuth)
    }, [])

    const login = (token: string, userData: User) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setIsAuthenticated(false)
        router.push("/login")
    }

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    }
}
