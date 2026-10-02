import { generateInterviewReport, getInterviewReportById, getAllInterviewReport, chatsWithAI, getAllChatSessions, getAllChatsById, deleteInterviewReportById, deleteChatsById } from '@/services/interview.api'
import { useContext, useEffect } from 'react'
import { InterviewContext } from '@/contexts/interview.context'
import { useParams, useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'


export function useInterview() {
    const context = useContext(InterviewContext)

    const router = useRouter()
    const pathname = usePathname()
    const params = useParams()

    const interviewId = params?.interviewId
    const chatId = params?.chatId

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const { loading, setLoading, interviewReport, setInterviewReport, interviewReports, setInterviewReports, chatMessages, setChatMessages, chatHistory, setChatHistory } = context

    if (chatId) {

    }

    const handleGenerateInterviewReport = async ({ jobDescription, selfDescription, customMessage, resumeFile }) => {
        setLoading(true)
        try {
            const data = await generateInterviewReport({ jobDescription, selfDescription, customMessage, resumeFile })
            if (data.success && data.interviewReport?.id) {
                setInterviewReport(data.interviewReport)
                toast.success(data.message)
                router.push(`${pathname}/${data.interviewReport.id}`)
                return data.success
            } else {
                toast.error(data.message)
                return data.success
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGetInterviewReportById = async (interviewId) => {
        const data = await getInterviewReportById(interviewId)
        if (data.success) {
            setInterviewReport(data.interviewReport)
        } else {
            router.replace('/interview')
            // toast.error(data.message)
        }
    }

    const handleGetAllInterviewReport = async () => {
        const data = await getAllInterviewReport()
        if (data.success) {
            setInterviewReports(data.interviewReport)
        }
    }

    const handleChatsWithAI = async ({ customMessage, file, chatId: selectedChatId = chatId, }) => {
        setLoading(true)
        try {
            const temporaryUserMessage = {
                id: `temp-user-${Date.now()}`,
                role: 'user',
                content: customMessage
            }
            setChatMessages(prev => [
                ...prev,
                temporaryUserMessage
            ])
            const data = await chatsWithAI({ customMessage, file, chatId: selectedChatId })
            if (data.success) {
                setChatMessages(prev => [
                    ...prev,
                    data.chatMessage
                ])
                return data.chatId
            } else {
                // Remove temporary user message if request fails
                setChatMessages(prev =>
                    prev.filter(message => !String(message.id).startsWith('temp-user-'))
                )
            }
        } catch (error) {
            console.error("Chat with AI error:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleGetAllChatsById = async (selectedChatId) => {
        const data = await getAllChatsById(selectedChatId)
        if (data.success) {
            setChatMessages(data.messages)
        } else {
            router.replace('/chats')
            // toast.error(data.message)
        }
    }

    const handleGetAllChatSessions = async () => {
        const data = await getAllChatSessions()
        if (data.success) {
            setChatHistory(data.chatSession)
        }
    }

    const handleDeleteInterviewReportById = async (interviewId) => {
        setLoading(true)
        try {
            const data = await deleteInterviewReportById(interviewId)
            if (data.success) {
                setInterviewReports((prev) =>
                    prev.filter((report) => Number(report.id) !== Number(interviewId))
                )
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteChatsById = async (chatId) => {
        setLoading(true)
        try {
            const data = await deleteChatsById(chatId)
            if (data.success) {
                setChatHistory((prev) =>
                    prev.filter((chat) => Number(chat.id) !== Number(chatId))
                )
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            handleGetInterviewReportById(interviewId)
        } else {
            handleGetAllInterviewReport()
        }
    }, [interviewId])

    useEffect(() => {
        if (chatId) {
            handleGetAllChatsById(chatId)
        }
    }, [chatId])

    useEffect(() => {
        handleGetAllChatSessions()
    }, [loading])

    return { loading, interviewReport, interviewReports, chatMessages, chatHistory, handleGenerateInterviewReport, handleChatsWithAI, handleDeleteChatsById, handleDeleteInterviewReportById }
}