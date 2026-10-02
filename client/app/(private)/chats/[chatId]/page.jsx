'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Menu, Bot, LoaderIcon } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import ChatsSidebar from '@/components/ChatsSidebar'
import PromptBox from '@/components/PromptBox'
import Message from '@/components/Message'
import { useInterview } from '@/hooks/useInterview'

export default function ChatResults() {
  const { chatMessages = [], loading } = useInterview()

  const router = useRouter()
  const params = useParams()

  const chatId = params?.chatId

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [chatMessages.length, loading])

  const handleHistoryClick = (selectedChatId) => {
    router.push(`/chats/${selectedChatId}`)
    setIsSidebarOpen(false)
  }


  return (
    <div className="mt-18 w-full overflow-hidden text-slate-100">
      <div className="relative flex h-[calc(100vh-4.5rem)] w-full overflow-hidden">
        {/* MOBILE OVERLAY */}
        {isSidebarOpen && (
          <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden" />
        )}

        {/* SIDEBAR */}
        <ChatsSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          handleHistoryClick={handleHistoryClick}
        />

        {/* RIGHT MAIN CHAT AREA */}
        <div className="relative h-full min-w-0 flex-1 overflow-hidden">
          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#111722] text-slate-300 shadow-lg transition-colors hover:bg-slate-800 hover:text-white md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>


          {/* CHAT CONTENT */}
          <main className="relative flex h-full w-full flex-col overflow-hidden">
            {/* MESSAGES */}
            <div className="h-full w-full overflow-y-auto px-4 py-8 pb-22 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
              <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
                {Array.isArray(chatMessages) &&
                  chatMessages.map((message, index) => (
                    <Message
                      key={message.id ?? `${message.role}-${index}`}
                      role={message.role === 'user' ? 'user' : 'ai'}
                      content={message.content}
                    />
                  ))
                }

                {/* AI THINKING */}
                {loading && (
                  <div className="flex w-full items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e1034d]/10">
                      <Bot className="h-6 w-6 text-[#e1034d]" />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-sm font-medium text-slate-400">
                        THINKING...
                      </span>
                      <LoaderIcon
                        className="h-4 w-4 animate-spin text-slate-400"
                      />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* FLOATING PROMPT BOX */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 px-4 pb-4">
              <div className="pointer-events-auto mx-auto w-full max-w-4xl">
                <PromptBox chatId={chatId} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}