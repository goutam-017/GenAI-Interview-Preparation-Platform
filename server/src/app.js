import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import interviewRouter from './routes/interview.route.js'

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)

app.use('/api/auth', authRouter)
app.use('/api/ai', interviewRouter)

// Server health check
app.get('/health', (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'API is working'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

export default app