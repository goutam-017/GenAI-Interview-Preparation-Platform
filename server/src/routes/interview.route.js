import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import upload from '../middleware/file.middleware.js'
import { generateInterviewReportController, generateChatsController, getInterviewReportByIdController, getAllInterviewReportsController, getAllChatSessionController, getChatsByIdController, deleteInterviewReportById, deleteChatsById } from '../controllers/interview.controller.js'


const interviewRouter = express.Router()

interviewRouter.post('/interview', authMiddleware, upload.single('resume'), generateInterviewReportController)
interviewRouter.get('/interview', authMiddleware, getAllInterviewReportsController)
interviewRouter.get('/interview/report/:interviewId', authMiddleware, getInterviewReportByIdController)
interviewRouter.delete('/interview/report/:interviewId', authMiddleware, deleteInterviewReportById)


interviewRouter.post('/chats', authMiddleware, upload.single('document'), generateChatsController)
interviewRouter.get('/chats/sessions', authMiddleware, getAllChatSessionController)
interviewRouter.get('/chats/sessions/:chatId', authMiddleware, getChatsByIdController)
interviewRouter.delete('/chats/sessions/:chatId', authMiddleware, deleteChatsById)


export default interviewRouter