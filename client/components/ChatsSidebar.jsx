'use client'

import { Clock, MessagesCircle, X, Trash2 } from 'lucide-react'
import React, { useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useInterview } from '@/hooks/useInterview'


const ChatsSidebar = ({ isSidebarOpen, setIsSidebarOpen, handleHistoryClick }) => {
  const { chatHistory = [], handleDeleteChatsById } = useInterview()

  const router = useRouter()
  const params = useParams()

  const currentChatId = params?.chatId ? Number(params.chatId) : null

  const sortedChatHistory = useMemo(() => {
    if (!Array.isArray(chatHistory)) {
      return []
    }

    return [...chatHistory].sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime()
      const dateB = new Date(b.updatedAt).getTime()
      return dateB - dateA
    })
  }, [chatHistory])

  // NEW CHAT
  const handleNewchat = () => {
    router.replace('/chats')
    setIsSidebarOpen(false)
  }

  // CHAT CLICK
  const handleChatClick = (chatId) => {
    handleHistoryClick(chatId)
    setIsSidebarOpen(false)
  }

  // DELETE CHAT
  const handleDeleteChat = async (e, chatId) => {
    e.stopPropagation()
    const confirmed = window.confirm(
      'Are you sure you want to delete this chat?'
    )
    if (!confirmed) {
      return
    }
    try {
      await handleDeleteChatsById(chatId)
      // If deleting currently opened chat
      if (Number(chatId) === currentChatId) {
        router.replace('/chats')
      }
    } catch (error) {
      console.error('Delete chat error:', error)
    }
  }

  return (
    <aside className={`absolute left-0 top-0 z-50 flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-t border-slate-800/80 bg-[#0c1017] transition-transform duration-300 ease-in-out md:relative md:z-auto md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-800/80 px-4">
        <div className="flex flex-col items-start gap-2 py-3">
          <button
            type="button"
            onClick={handleNewchat}
            title='Click to new chat'
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-slate-700 px-2 py-1.5 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <MessagesCircle className="h-5 w-5 text-[#ff2a6d]" />
            <span className="text-sm font-semibold">
              New Chat
            </span>
          </button>
        </div>

        {/* MOBILE CLOSE */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white md:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* CHAT LIST */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
        {/* RECENTS HEADER */}
        <div className="mb-2 flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-300">
          <Clock className="h-5 w-5 text-[#ff2a6d]" />
          <span className="text-sm font-semibold">
            Recents
          </span>
        </div>

        {/* CHAT HISTORY */}
        {sortedChatHistory.length > 0 ? (
          <div className="space-y-1">
            {sortedChatHistory.map((history) => {
              const isActive = Number(history.id) === currentChatId

              return (
                <button
                  key={history.id}
                  type="button"
                  onClick={() => handleChatClick(history.id)}
                  className={`group relative flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-150 ${isActive ? 'bg-[#ff2a6d]/10 text-white' : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'}`}
                >
                  {/* ACTIVE INDICATOR */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-[#ff2a6d]" />
                  )}

                  {/* CHAT TITLE */}
                  <span className={`min-w-0 flex-1 truncate text-sm ${isActive ? 'font-medium text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {history.title}
                  </span>

                  {/* DELETE BUTTON */}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => handleDeleteChat(e, history.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleDeleteChat(e, history.id)
                      }
                    }}
                    className="shrink-0 rounded-md p-1.5 text-slate-600 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                    title="Delete chat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </span>
                </button>
              )
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/60">
              <Clock className="h-5 w-5 text-slate-600" />
            </div>
            <p className="text-sm text-slate-400">
              No Recents chat yet
            </p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="shrink-0 border-t border-slate-800/80 px-4 py-3">
        <p className="text-center text-[11px] text-[#ff2a6d]">
          Your chats history
        </p>
      </div>
    </aside>
  )
}

export default ChatsSidebar