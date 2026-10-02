import { generateInterviewReport, generateGeneralChat } from '../services/ai.service.js'
import InterviewReportModel from '../models/interviewReport.model.js'
import extractDocumentText from '../utils/utils.js'
import ChatSessionModel from '../models/chatSession.model.js'
import ChatMessageModel from '../models/chatMessage.model.js'


export const generateInterviewReportController = async (req, res) => {
    try {
        const resumeFile = req.file
        const { selfDescription, jobDescription, userPrompt } = req.body

        if (!selfDescription) {
            return res.status(400).json({ success: false, message: 'Self Description is required.' })
        }

        if (!jobDescription) {
            return res.status(400).json({ success: false, message: 'Job Description is required.' })
        }

        if (!userPrompt) {
            return res.status(400).json({ success: false, message: 'User Prompt is required.' })
        }

        let resumeContent = ''

        // Resume is optional
        if (resumeFile) {
            if (resumeFile.size > 5 * 1024 * 1024) {
                return res.status(400).json({ success: false, message: 'File is not to be above than 5MB.' })
            }
            resumeContent = await extractDocumentText(resumeFile)

            if (!resumeContent?.trim()) {
                return res.status(400).json({ success: false, message: "Could not extract readable text from the uploaded file." })
            }
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription,
            userPrompt
        })

        const interviewReport = await InterviewReportModel.create({
            userId: req.user.id,
            resume: resumeContent,
            selfDescription, jobDescription,
            ...interviewReportByAi
        })

        return res.status(201).json({
            success: true, message: 'Interview Report generated successfully.', interviewReport: {
                id: interviewReport.id,
                userId: interviewReport.userId,
                matchScore: interviewReport.matchScore,
                title: interviewReport.title,
                technicalQuestions: interviewReport.technicalQuestions,
                behavioralQuestions: interviewReport.behavioralQuestions,
                skillGaps: interviewReport.skillGaps,
                preparationPlans: interviewReport.preparationPlans
            }
        })

    } catch (error) {
        console.error('Interview report generation error:', error)
        return res.status(500).json({ success: false, message: error.message || 'Internal server error.' })
    }
}

export const getInterviewReportByIdController = async (req, res) => {
    try {
        const { interviewId } = req.params
        if (!interviewId) {
            return res.status(400).json({ success: false, message: 'Interview Id required.' })
        }

        const interviewReport = await InterviewReportModel.findOne({
            where: { id: interviewId, userId: req.user.id },
            attributes: { exclude: ["resume", "selfDescription", "jobDescription"] }
        })

        if (!interviewReport) {
            return res.status(404).json({ success: false, message: 'Interview Report not found.' })
        }

        return res.status(200).json({ success: true, message: 'Interview Report Fecthed Successfully.', interviewReport })
    } catch (error) {
        console.error('getInterviewReportByIdController Error: ', error)
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

export const getAllInterviewReportsController = async (req, res) => {
    try {
        const interviewReport = await InterviewReportModel.findAll({
            where: { userId: req.user.id },
            order: [["createdAt", "DESC"]],
            attributes: { exclude: ["resume", "selfDescription", "jobDescription", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlans"] }
        })

        if (!interviewReport) {
            return res.status(404).json({ success: false, message: 'Interview Report not found.' })
        }

        return res.status(200).json({ success: true, message: 'Interview Report Fecthed Successfully.', interviewReport })
    } catch (error) {
        console.error('getInterviewReportByIdController Error: ', error)
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}


export const generateChatsController = async (req, res) => {
    try {
        const file = req.file

        const { userPrompt } = req.body
        const rawChatId = req.body.chatId
        const chatId = Number(rawChatId)

        const userId = req.user.id

        if (!userPrompt?.trim()) {
            return res.status(400).json({ success: false, message: "User prompt is required." })
        }

        let chatSession

        if (chatId) {
            chatSession = await ChatSessionModel.findOne({ where: { id: chatId, userId } })

            if (!chatSession) {
                return res.status(404).json({ success: false, message: "Chat not found." })
            }
        } else {
            // Create title from first user message
            const title = userPrompt?.trim() ? userPrompt.trim().substring(0, 60) : "New Chat"

            chatSession = await ChatSessionModel.create({ userId, title })
        }

        let fileContent = ""

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                return res.status(400).json({ success: false, message: 'File is not to be above than 5MB.' })
            }
            fileContent = await extractDocumentText(file)

            if (!fileContent?.trim()) {
                return res.status(400).json({ success: false, message: "Could not extract readable text from the uploaded file." })
            }
        }

        await ChatMessageModel.create({
            userId,
            chatId: chatSession.id,
            role: "user",
            content: userPrompt?.trim() || "",
            document: fileContent || "",
        })

        const conversationMessages = await ChatMessageModel.findAll({
            where: { chatId: chatSession.id, userId },
            order: [["createdAt", "DESC"]],
            limit: 20,
            raw: true
        })

        // Reverse because we fetched newest first
        conversationMessages.reverse()

        const generateGeneralChatByAi = await generateGeneralChat({ messages: conversationMessages, text: fileContent })

        if (!generateGeneralChatByAi?.answer) {
            return res.status(500).json({ success: false, message: "Failed to generate AI response." })
        }

        const assistantMessage = await ChatMessageModel.create({
            userId,
            chatId: chatSession.id,
            role: "assistant",
            content: generateGeneralChatByAi.answer,
            document: ""
        })

        // Force Sequelize to recognize updatedAt as changed
        chatSession.setDataValue("updatedAt", new Date())
        chatSession.changed("updatedAt", true)

        await chatSession.save({
            silent: false,
        })

        return res.status(200).json({
            success: true,
            message: "General Chat generated successfully.",
            chatId: chatSession.id,

            chatMessage: {
                id: assistantMessage.id,
                userId: assistantMessage.userId,
                chatId: assistantMessage.chatId,
                role: assistantMessage.role,
                content: assistantMessage.content,
            }
        })
    } catch (error) {
        console.error("General chat controller error:", error)
        return res.status(500).json({ success: false, message: error.message || "Internal server error." })
    }
}

export const getAllChatSessionController = async (req, res) => {
    try {
        const chatSession = await ChatSessionModel.findAll({
            where: { userId: req.user.id },
            order: [["updatedAt", "DESC"]],
            raw: true
        })

        if (!chatSession) {
            return res.status(404).json({ success: false, message: 'Chat Session not found.' })
        }

        return res.status(200).json({ success: true, message: 'Chat Session Fecthed Successfully.', chatSession })
    } catch (error) {
        console.error("Get All Chats controller error:", error)
        return res.status(500).json({ success: false, message: error.message || "Internal server error." })
    }
}

export const getChatsByIdController = async (req, res) => {
    try {
        const userId = req.user.id
        const { chatId } = req.params

        // Get messages
        const messages = await ChatMessageModel.findAll({
            where: { chatId, userId, },
            attributes: ["id", "chatId", "role", "content", "document", "createdAt"],
            order: [["createdAt", "ASC"]],
            raw: true
        })

        if (messages.length === 0) {
            return res.status(404).json({ success: false, message: 'Chats not found.' })
        }

        return res.status(200).json({ success: true, message: 'Fecthed successfully.', messages })
    } catch (error) {
        console.error("Get general chat by id error:", error)
        return res.status(500).json({ success: false, message: error.message || "Failed to retrieve chat.", })
    }
}


export const deleteInterviewReportById = async (req, res) => {
    try {
        const { interviewId } = req.params
        if (!interviewId) {
            return res.status(400).json({ success: false, message: "Interview report id required." })
        }
        const deleted = await InterviewReportModel.destroy({ where: { id: interviewId, userId: req.user.id } })
        if (deleted === 0) {
            return res.status(404).json({ success: false, message: "Interview report not found." })
        }
        return res.status(200).json({ success: true, message: "Interview report deleted successfully." })
    } catch (error) {
        console.error("deleteInterviewReportById Error:", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const deleteChatsById = async (req, res) => {
    try {
        const { chatId } = req.params
        if (!chatId) {
            return res.status(400).json({ success: false, message: "Chat id required." })
        }
        const deleted = await ChatSessionModel.destroy({
            where: { id: chatId, userId: req.user.id }
        })
        if (deleted === 0) {
            return res.status(404).json({ success: false, message: "Chat not found." })
        }
        return res.status(200).json({ success: true, message: "Chat deleted successfully." })
    } catch (error) {
        console.error("deleteChatsById Error:", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}