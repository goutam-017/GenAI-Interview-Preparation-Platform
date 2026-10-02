'use client'

import { createContext, useState } from "react"


export const InterviewContext = createContext()

const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [interviewReport, setInterviewReport] = useState(null)
    const [interviewReports, setInterviewReports] = useState([])

    const [chatMessages, setChatMessages] = useState([])
    const [chatHistory, setChatHistory] = useState([])

    const value = {
        loading, setLoading,
        interviewReport, setInterviewReport,
        interviewReports, setInterviewReports,
        chatMessages, setChatMessages,
        chatHistory, setChatHistory
    }

    return (
        <InterviewContext.Provider value={value}>
            {children}
        </InterviewContext.Provider>
    )
}

export default InterviewProvider