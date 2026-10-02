import { Bot } from 'lucide-react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Message = ({ role, content }) => {

    const isUser = role === 'user'

    return (
        <div className="w-full max-w-3xl text-sm">
            <div className={`mb-8 flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                {/* ================= USER MESSAGE ================= */}
                {isUser ? (
                    <div className="max-w-[80%]">
                        <div className="rounded-2xl rounded-br-md bg-[#e1034d] px-5 py-3 text-[15px] leading-6 text-white">
                            <p className="whitespace-pre-wrap break-words">
                                {content}
                            </p>
                        </div>
                    </div>
                ) : (
                    /* ================= AI MESSAGE ================= */
                    <div className="flex w-full items-start gap-3">
                        {/* AI ICON */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e1034d]/10">
                            <Bot className="h-6 w-6 text-[#e1034d]" />
                        </div>

                        {/* AI CONTENT */}
                        <div className="min-w-0 max-w-3xl flex-1 text-[15px] leading-7 text-slate-200">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className="mb-4 mt-2 text-2xl font-bold text-white">
                                            {children}
                                        </h1>
                                    ),

                                    h2: ({ children }) => (
                                        <h2 className="mb-3 mt-5 text-xl font-bold text-white">
                                            {children}
                                        </h2>
                                    ),

                                    h3: ({ children }) => (
                                        <h3 className="mb-2 mt-4 text-lg font-semibold text-white">
                                            {children}
                                        </h3>
                                    ),

                                    p: ({ children }) => (
                                        <p className="mb-4 last:mb-0">
                                            {children}
                                        </p>
                                    ),

                                    ul: ({ children }) => (
                                        <ul className="mb-4 ml-6 list-disc space-y-2">
                                            {children}
                                        </ul>
                                    ),

                                    ol: ({ children }) => (
                                        <ol className="mb-4 ml-6 list-decimal space-y-2">
                                            {children}
                                        </ol>
                                    ),

                                    li: ({ children }) => (
                                        <li className="pl-1">
                                            {children}
                                        </li>
                                    ),

                                    strong: ({ children }) => (
                                        <strong className="font-semibold text-white">
                                            {children}
                                        </strong>
                                    ),

                                    blockquote: ({ children }) => (
                                        <blockquote className="my-4 border-l-4 border-[#e1034d] pl-4 italic text-slate-400">
                                            {children}
                                        </blockquote>
                                    ),

                                    a: ({ children, href }) => (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#ff4f83] underline hover:text-[#ff719c]"
                                        >
                                            {children}
                                        </a>
                                    ),

                                    code: ({ children, className }) => {
                                        const isBlock = className?.includes('language-')

                                        if (isBlock) {
                                            return (
                                                <code className={`${className} block overflow-x-auto rounded-lg bg-[#111] p-4 text-sm leading-6 text-slate-200`}>
                                                    {children}
                                                </code>
                                            )
                                        }

                                        return (
                                            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-pink-300">
                                                {children}
                                            </code>
                                        )
                                    },

                                    pre: ({ children }) => (
                                        <pre className="mb-4 overflow-x-auto rounded-lg bg-[#111]">
                                            {children}
                                        </pre>
                                    ),

                                    table: ({ children }) => (
                                        <div className="mb-4 overflow-x-auto">
                                            <table className="w-full border-collapse border border-slate-700 text-sm">
                                                {children}
                                            </table>
                                        </div>
                                    ),

                                    th: ({ children }) => (
                                        <th className="border border-slate-700 bg-slate-800 px-4 py-2 text-left font-semibold text-white">
                                            {children}
                                        </th>
                                    ),

                                    td: ({ children }) => (
                                        <td className="border border-slate-700 px-4 py-2">
                                            {children}
                                        </td>
                                    ),

                                    hr: () => (
                                        <hr className="my-6 border-slate-700" />
                                    ),
                                }}
                            >
                                {content || ''}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Message