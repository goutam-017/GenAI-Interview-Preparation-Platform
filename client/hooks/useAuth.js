import { AuthContext } from "@/contexts/auth.context"
import { useContext, useEffect } from "react"
import { register, login, logout } from "@/services/auth.api.js"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function useAuth() {
    const context = useContext(AuthContext)

    const router = useRouter()

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (data.success) {
                setUser(data.user)
                toast.success(data.message)
                router.push("/")
                return data.success
            } else {
                toast.error(data.message)
                return data.success
            }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ fullname, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ fullname, email, password })
            if (data.success) {
                setUser(data.user)
                toast.success(data.message)
                router.push("/")
                return data.success
            } else {
                toast.error(data.message)
                return data.success
            }
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            if (data.success) {
                setUser(null)
                toast.success(data.message)
                router.push('/auth')
                return data.success
            } else {
                toast.error(data.message)
                return data.success
            }
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleLogin, handleRegister, handleLogout }
}