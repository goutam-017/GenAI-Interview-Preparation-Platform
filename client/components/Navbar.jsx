'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { SparklesIcon } from 'lucide-react'
import { navItems } from '@/assets/assets'

const Navbar = () => {
    const { handleLogout } = useAuth()

    const router = useRouter()
    const pathname = usePathname()

    const [isOpen, setIsOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Detect page scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const closeMobileMenu = () => {
        setIsOpen(false)
    }

    const navigateTo = (path) => {
        closeMobileMenu()
        router.push(path)
    }

    const isActive = (path) => {
        if (path === '/') {
            return pathname === '/'
        }
        return pathname === path || pathname.startsWith(`${path}/`)
    }

    const Logout = async () => {
        if (isLoggingOut) return
        try {
            setIsLoggingOut(true)
            const data = await handleLogout()
            if (data) {
                closeMobileMenu()
            }
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <nav className={`fixed top-0 z-50 w-full px-5 py-1 transition-all duration-300 lg:px-8 xl:px-[8%] ${isScrolled ? 'border-b border-white/10 bg-[#0b0e14]/80 shadow-sm backdrop-blur-lg' : 'border-b border-transparent bg-transparent'}`}>
            {/* Background Glow */}
            {/* <div className="pointer-events-none absolute left-1/2 top-10 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#e1034d]/10 blur-[120px]" /> */}
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2 justify-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e1034d] text-white shadow-md shadow-[#e1034d]/20">
                        <SparklesIcon size={21} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">
                        PrepInterview<span className="text-[#e1034d]">.AI</span>
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
                    <div className={`flex items-center gap-1.5 rounded-4xl p-2 transition-all duration-300 border border-white/10 bg-[#0b0e14]`}>
                        {navItems.map((item) => {
                            const active = isActive(item.path)

                            return (
                                <button
                                    key={item.path}
                                    type="button"
                                    onClick={() => navigateTo(item.path)}
                                    className={`rounded-4xl px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${active ? 'bg-[#e1034d] text-white shadow-sm' : 'text-gray-400 hover:bg-[#303030]/70 hover:text-white'}`}
                                >
                                    {item.name}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Desktop Logout */}
                <button
                    type="button"
                    onClick={Logout}
                    disabled={isLoggingOut}
                    className="hidden rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 md:block"
                >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="rounded-xl p-2.5 text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white md:hidden"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                >
                    {isOpen ? (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 md:hidden ${isOpen
                    ? 'visible max-h-[500px] opacity-100'
                    : 'invisible max-h-0 opacity-0'
                    }`}
            >
                <div className="border-t border-white/10 bg-[#0b0e14]/95 shadow-2xl shadow-black/30 backdrop-blur-xl">
                    <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6">
                        {/* Navigation Card */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2">
                            <div className="flex flex-col gap-1">
                                {navItems.map((item) => {
                                    const active = isActive(item.path)

                                    return (
                                        <button
                                            key={item.path}
                                            type="button"
                                            onClick={() => navigateTo(item.path)}
                                            className={`flex w-full items-center rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${active
                                                ? 'bg-[#e1034d] text-white shadow-lg shadow-[#e1034d]/20'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            {item.name}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Logout */}
                        <div className="mt-4 border-t border-white/10 pt-4">
                            <button
                                type="button"
                                onClick={Logout}
                                disabled={isLoggingOut}
                                className="flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoggingOut ? 'Logging out...' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar