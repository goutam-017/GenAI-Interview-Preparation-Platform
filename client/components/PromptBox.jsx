import { FileText, X, LoaderIcon, SendHorizontal, Plus } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInterview } from '@/hooks/useInterview'


const PromptBox = ({ chatId }) => {
    const { handleChatsWithAI } = useInterview()

    const [file, setFile] = useState(null)
    const [customMessage, setCustomMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const textareaRef = useRef(null)
    const handleTextareaChange = (e) => {
        setCustomMessage(e.target.value)
        const textarea = e.target
        textarea.style.height = 'auto'
        const maxHeight = 160
        textarea.style.height = `${Math.min(
            textarea.scrollHeight,
            maxHeight
        )}px`
    }

    // customMessage required.
    const canSubmit = customMessage.trim().length > 0

    const resetForm = () => {
        setCustomMessage('')
        setFile(null)

        if (textareaRef.current) {
            textareaRef.current.style.height = '38px'
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!canSubmit || isLoading) return
        setIsLoading(true)

        try {
            const data = await handleChatsWithAI({ customMessage, file, chatId })
            if (!chatId) {
                router.push(`/chats/${data}`)
            }
        } finally {
            setIsLoading(false)
            resetForm()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl">
            {/* ================= ATTACHED FILE ================= */}
            {file && (
                <div className="mb-1 flex items-start">
                    <div className="flex max-w-md items-center gap-3 rounded-xl border border-slate-800 bg-[#151515] px-3 py-2">
                        <FileText className="h-5 w-5 shrink-0 text-[#ff2a6d]" />

                        <div className="min-w-0">
                            <p className="max-w-[240px] truncate text-sm font-medium text-slate-200">
                                {file.name}
                            </p>

                            <p className="text-xs text-slate-500">
                                {(file.size / 1024).toFixed(1)} KB • Ready
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setFile(null)
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = ''
                                }
                            }}
                            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="relative flex min-h-[52px] w-full items-end rounded-[28px] border border-slate-700/70 bg-[#202020] px-3 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-200 focus-within:border-slate-600 focus-within:bg-[#242424]">
                {/* ================= PLUS / FILE UPLOAD ================= */}
                <input
                    ref={fileInputRef}
                    type="file"
                    id="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-0.5 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-slate-700/60 hover:text-white"
                    title="Upload File"
                >
                    <Plus className="h-5 w-5" />
                </button>

                {/* ================= PROMPT ================= */}
                <div className="flex min-w-0 flex-1 items-end px-2">
                    <textarea
                        ref={textareaRef}
                        value={customMessage}
                        onChange={handleTextareaChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()

                                if (canSubmit && !isLoading) {
                                    handleSubmit(e)
                                }
                            }
                        }}
                        placeholder="Ask anything"
                        rows={1}
                        className="block max-h-[160px] min-h-[38px] w-full resize-none overflow-y-auto border-none bg-transparent px-1 py-2 text-[16px] leading-6 text-slate-100 outline-none placeholder:text-slate-500 scrollbar-hide"
                    />
                </div>

                {/* ================= SUBMIT ================= */}
                <button
                    type="submit"
                    disabled={!canSubmit || isLoading}
                    className={`mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${!canSubmit || isLoading ? 'cursor-not-allowed bg-slate-700/70 text-slate-500' : 'bg-[#e1034d] text-white hover:bg-[#c90344]'}`}
                >
                    {isLoading ? (
                        <LoaderIcon className="h-4 w-4 animate-spin" />
                    ) : (
                        <SendHorizontal className="h-[17px] w-[17px]" />
                    )}
                </button>
            </div>

            {/* ================= HINT ================= */}
            {
                !chatId &&
                <p className="mt-1 text-center text-xs text-slate-400">
                    Press Enter to send · Shift + Enter for a new line
                </p>
            }
        </form>
    )
}

export default PromptBox
