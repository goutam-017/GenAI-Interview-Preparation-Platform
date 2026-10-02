import axios from "axios"
import config from '../config/config.js'


const api = axios.create({
    baseURL: config.BASE_URL,
    withCredentials: true
})

export const generateInterviewReport = async ({ jobDescription, selfDescription, customMessage, resumeFile }) => {
    try {
        const formData = new FormData()

        formData.append('jobDescription', jobDescription)
        formData.append('selfDescription', selfDescription)
        formData.append('userPrompt', customMessage)
        // Resume is optional
        if (resumeFile) {
            formData.append('resume', resumeFile)
        }

        const { data } = await api.post('/api/ai/interview', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}

export const getInterviewReportById = async (interviewId) => {
    try {
        const { data } = await api.get(`/api/ai/interview/report/${interviewId}`)
        return data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}

export const getAllInterviewReport = async () => {
    try {
        const { data } = await api.get(`/api/ai/interview`)
        return data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}

export const chatsWithAI = async ({ customMessage, file, chatId }) => {
    try {
        const formData = new FormData()

        formData.append('userPrompt', customMessage)
        if (chatId) {
            formData.append('chatId', chatId)
        }

        // Resume is optional
        if (file) {
            formData.append('document', file)
        }

        const { data } = await api.post('/api/ai/chats', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}

export const getAllChatSessions = async () => {
    try {
        const { data } = await api.get(`/api/ai/chats/sessions`)
        return data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}

export const getAllChatsById = async (chatId) => {
    try {
        const { data } = await api.get(`/api/ai/chats/sessions/${chatId}`)
        return data
    } catch (error) {
        console.log(error.response?.status)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}

export const deleteInterviewReportById = async (interviewId) => {
    try {
        const { data } = await api.delete(`/api/ai/interview/report/${interviewId}`)
        return data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}

export const deleteChatsById = async (chatId) => {
    try {
        const { data } = await api.delete(`/api/ai/chats/sessions/${chatId}`)
        return data
    } catch (error) {
        console.log(error.response?.data)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}