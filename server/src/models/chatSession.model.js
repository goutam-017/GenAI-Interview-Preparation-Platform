import { connection } from "../config/dbconnection.js"
import { DataTypes } from "sequelize"

const ChatSessionModel = connection.define("ChatSession", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    userId: { type: DataTypes.INTEGER, allowNull: false, },
    title: { type: DataTypes.STRING(150), allowNull: false, defaultValue: "New Chat", }
}, {
    tableName: "chat_sessions",
    timestamps: true
})

export default ChatSessionModel