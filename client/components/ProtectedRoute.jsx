"use client"

import { LoaderIcon } from "lucide-react"
import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/contexts/auth.context"

const ProtectedRoute = ({ children, requireAuth = true }) => {
    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (loading) return

        if (requireAuth && !user) {
            router.replace("/auth")
        }

        if (!requireAuth && user) {
            router.replace("/")
        }
    }, [loading, user, requireAuth, router])

    // if (loading) {
    //     return (
    //         <div className="flex min-h-screen items-center justify-center">
    //             <LoaderIcon className="h-6 w-6 animate-spin text-[#e1034d]" />
    //         </div>
    //     )
    // }

    // Protected route + user is not authenticated
    if (requireAuth && !user) {
        return null
    }

    // Guest route + user is authenticated
    if (!requireAuth && user) {
        return null
    }

    return children
}

export default ProtectedRoute