import UserModel from "./user.model.js";
import InterviewReportModel from "./interviewReport.model.js";
import ChatSessionModel from "./chatSession.model.js";
import chatMessageModel from "./chatMessage.model.js";



// User -> InterviewReport
UserModel.hasMany(InterviewReportModel, { foreignKey: "userId", as: "interviewreports", onDelete: "CASCADE" })
InterviewReportModel.belongsTo(UserModel, { foreignKey: "userId", as: "users" })

// User -> ChatSession interviewreports
UserModel.hasMany(ChatSessionModel, { foreignKey: "userId", as: "chat_sessions", onDelete: "CASCADE", })
ChatSessionModel.belongsTo(UserModel, { foreignKey: "userId", as: "users", })

// ChatSession -> Chats
ChatSessionModel.hasMany(chatMessageModel, { foreignKey: "chatId", as: "chat_messages", onDelete: "CASCADE", })
chatMessageModel.belongsTo(ChatSessionModel, { foreignKey: "chatId", as: "chat", })

export { UserModel, InterviewReportModel, ChatSessionModel, chatMessageModel }