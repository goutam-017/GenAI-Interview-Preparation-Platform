"use client"

import React, { useState } from "react"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon, LoaderIcon, ArrowRightIcon, SparklesIcon } from "lucide-react"
import { useAuth } from "@/hooks/useAuth.js"

const Authentication = () => {
    const { handleLogin, handleRegister } = useAuth()

    const [isLogin, setIsLogin] = useState(true)

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const resetForm = () => {
        setFullname("")
        setEmail("")
        setPassword("")
    }

    const switchMode = () => {
        setIsLogin((prev) => !prev)
        resetForm()
        setShowPassword(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isLogin) {
                const data = await handleLogin({ email, password })
                if (data) {
                    resetForm()
                }
            } else {
                const data = await handleRegister({ fullname, email, password })
                if (data) {
                    resetForm()
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-8">
            {/* Main Authentication Card */}
            <div className="w-full max-w-md rounded-3xl bg-[#11161f] border-2 border-dashed border-[#e1034d] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-8">
                {/* Logo */}
                <div className="mb-5 flex items-center justify-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e1034d] text-white shadow-md shadow-[#e1034d]/20">
                        <SparklesIcon size={21} />
                    </div>

                    <span className="text-2xl font-bold tracking-tight">
                        PrepInterview<span className="text-[#e1034d]">.AI</span>
                    </span>
                </div>

                {/* Heading */}
                <div className="mb-4 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#e1034d]">
                        {isLogin ? "Welcome back" : "Get started"}
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight">
                        {isLogin ? "Sign in to your account" : "Create your account"}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {isLogin ? "Enter your details below to continue." : "Create an account to get started."}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Fullname */}
                    {!isLogin && (
                        <div>
                            <label className="mb-2 block text-sm font-semibold">
                                Full Name
                            </label>

                            <div className="group relative">
                                <UserIcon size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#e1034d]" />

                                <input
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    placeholder="Enter your fullname"
                                    required
                                    className="h-12 w-full rounded-xl border border-black/10 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#e1034d] focus:bg-white"
                                />
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Email address
                        </label>

                        <div className="group relative">
                            <MailIcon
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#e1034d]"
                            />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className="h-12 w-full rounded-xl border border-black/10 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#e1034d] focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-semibold">
                                Password
                            </label>
                        </div>

                        <div className="group relative">
                            <LockIcon
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#e1034d]"
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                required
                                className="h-12 w-full rounded-xl border border-black/10 bg-gray-50 pl-11 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#e1034d] focus:bg-white"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#e1034d] cursor-pointer"
                            >
                                {showPassword ? (
                                    <EyeOffIcon size={19} />
                                ) : (
                                    <EyeIcon size={19} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-4xl bg-[#e1034d] text-sm font-semibold text-white transition-all duration-300 ${loading
                            ? "cursor-not-allowed opacity-70"
                            : "cursor-pointer hover:bg-[#c90344]"
                            }`}
                    >
                        {loading ? (
                            <LoaderIcon size={20} className="animate-spin" />
                        ) : (
                            <>
                                <span>{isLogin ? "Sign in" : "Create account"}</span>

                                <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </form>

                {/* Switch */}
                <div className="mt-7 text-center">
                    <p className="text-sm text-gray-500">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}

                        <button type="button" onClick={switchMode} className="ml-1.5 font-semibold text-[#e1034d] cursor-pointer underline">
                            {isLogin ? "Create one" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Authentication