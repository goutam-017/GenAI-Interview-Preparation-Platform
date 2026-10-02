import { Sequelize } from "sequelize"
import config from "./config.js"

export const connection = new Sequelize(config.DATABASE_URL, {
    dialect: "postgres",
    schema: "genai_project",
    logging: false
})

export const connectDB = async () => {
    try {
        await connection.authenticate()
        console.log("✅ Database connected successfully")
    } catch (error) {
        console.error("❌ Database connection failed:", error.message)
    }
}