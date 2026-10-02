import { connection } from "../config/dbconnection.js"
import { DataTypes } from "sequelize"

const InterviewReportModel = connection.define("InterviewReport", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    jobDescription: { type: DataTypes.TEXT, allowNull: false },
    resume: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
    selfDescription: { type: DataTypes.TEXT, allowNull: true },
    title: { type: DataTypes.TEXT, allowNull: false },
    matchScore: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 0, max: 100, } },
    technicalQuestions: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] },
    behavioralQuestions: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] },
    skillGaps: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] },
    preparationPlans: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] }
}, {
    tableName: "interviewreports",
    timestamps: true
})

export default InterviewReportModel