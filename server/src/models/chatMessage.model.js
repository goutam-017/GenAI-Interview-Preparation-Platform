import { connection } from "../config/dbconnection.js";
import { DataTypes } from "sequelize";

const ChatMessageModel = connection.define("ChatMessage", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    chatId: { type: DataTypes.INTEGER, allowNull: false },
    role: { type: DataTypes.ENUM("user", "assistant"), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    document: { type: DataTypes.TEXT, allowNull: true, defaultValue: "" },
}, {
    tableName: "chat_messages",
    timestamps: true
})

export default ChatMessageModel