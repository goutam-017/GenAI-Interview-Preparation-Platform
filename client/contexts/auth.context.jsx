"use client"

import { createContext, useState, useEffect } from "react"
import { getMe } from "@/services/auth.api.js"


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()

                if (data.success) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.error("Authentication check failed:", error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()
    }, [])

    const value = {
        user, setUser,
        loading, setLoading,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider