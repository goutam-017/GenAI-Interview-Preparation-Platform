import dotenv from "dotenv"
dotenv.config()

if (!process.env.PORT) {
    throw new Error("PORT is not defined in env file")
}

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in env file")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in env file")
}

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in env file")
}

if (!process.env.TAVILY_API_KEY) {
    throw new Error("TAVILY_API_KEY is not defined in env file")
}

const config = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    TAVILY_API_KEY: process.env.TAVILY_API_KEY,
}

export default config