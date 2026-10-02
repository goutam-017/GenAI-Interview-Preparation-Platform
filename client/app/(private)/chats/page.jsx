'use client'

import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from "next/navigation"
import ChatsSidebar from '@/components/ChatsSidebar'
import PromptBox from '@/components/PromptBox'


export default function Chats() {
  const { user } = useAuth()
  const router = useRouter()
  // Sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const userFirstName = user?.fullname?.split(' ')[0] || ''
  /*
 * Handle history click
 */
  const handleHistoryClick = (chatId) => {
    router.push(`/chats/${chatId}`)
    setIsSidebarOpen(false)
  }

  return (
    <div className="w-full mt-18 text-slate-100 overflow-hidden">
      <div className="relative flex h-[calc(100vh-4.5rem)] w-full overflow-hidden">
        {/* MOBILE BACKDROP */}
        {isSidebarOpen && (<div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden" />)}

        <ChatsSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} handleHistoryClick={handleHistoryClick} />

        {/* right main side for containing the form user inputs and this is scorllable */}
        <div className="flex-1 min-w-0 h-full overflow-hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#111722] text-slate-300 shadow-lg transition-colors hover:bg-slate-800 hover:text-white md:hidden">
            <Menu className="h-5 w-5" />
          </button>

          <main className="relative z-10 flex h-full w-full flex-col overflow-hidden">
            {/* ================= MAIN CONTENT ================= */}
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-20">
              {/* ================= GREETING ================= */}
              <div className="mb-10 text-center">
                <h1 className="text-2xl font-normal tracking-tight text-slate-100 sm:text-3xl">
                  Hello {userFirstName}, What’s on your mind today?
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  How can I help you prepare for your interview?
                </p>
              </div>
              {/* ================= COMPOSER ================= */}
              <PromptBox chatId={false} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}