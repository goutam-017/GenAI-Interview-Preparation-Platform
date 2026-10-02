import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import config from "../config/config.js"
import { z } from 'zod'
import { tool } from "@langchain/core/tools"
import { createAgent } from "langchain"
import { tavily } from "@tavily/core"


const tvly = tavily({ apiKey: config.TAVILY_API_KEY })

const getLatestInformation = async ({ query }) => {
    const response = await tvly.search(query);

    return response.results.map((result) => {
        return `Title: ${result.title || "N/A"}
                URL: ${result.url || "N/A"}
                Content: ${result.content || ""}
            `
    }).join("\n\n")
}


const getLatestInformationTool = tool(
    getLatestInformation,
    {
        name: "get_latest_information",
        description:
            "Search the web for current, recent, or up-to-date information about a topic. " +
            "Use this tool when the user asks about latest news, current information, " +
            "recent events, current technologies, current prices, or information that may have changed recently.",
        schema: z.object({
            query: z.string().describe("The topic or question that needs current web information.")
        })
    }
)

const geminiModel = new ChatGoogleGenerativeAI({
    apiKey: config.GEMINI_API_KEY,
    model: "gemini-3.5-flash-lite",
    temperature: 0
})


const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe(`A numerical score between 0 and 100 that indicates how well the candidate's resume, skills, experience, and projects align with the requirements of the provided job description. A higher score suggests a stronger match, while a lower score indicates areas for improvement.`),

    technicalQuestions: z.array(z.object({
        question: z.string().describe('The technical question can be asked in the interview.'),
        intention: z.string().describe('The intention of interviewer behind asking this technical question.'),
        answer: z.string().describe('How to answer this question, what points to cover, what approach to take etc.'),
    })).describe('Technical questions that can be asked in the interview, along with their intention and how to answer them.'),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe('The behavioral question can be asked in the interview.'),
        intention: z.string().describe('The intention of interviewer behind asking this behavioral question.'),
        answer: z.string().describe('How to answer this question, what points to cover, what approach to take etc.')
    })).describe('Behavioral questions that can be asked in the interview, along with their intention and how to answer them.'),

    skillGaps: z.array(z.object({
        skill: z.string().describe('The skill that the candidate is lacking or needs improvement.'),
        severity: z.enum(['low', 'medium', 'high']).describe('The severity of the skill gap, e.g., low, medium, high.'),
        solution: z.string().describe('A brief suggestion or solution on how the candidate can improve this skill gap.')
    })).describe('List of skill gaps that the candidate has, along with their severity.'),

    preparationPlans: z.array(z.object({
        days: z.number().describe('The day number in the preparation plan, starting from 1.'),
        focus: z.string().describe('The main focus of this day in the preparation plan, e.g., data structures, algorithms, system design, mock interviews etc.'),
        tasks: z.array(z.string()).describe('List of tasks or activities to be completed on this day to improve skills and prepare for the interview.'),
    })).describe('A preparation plan for the candidate to improve their skills and prepare for the interview.'),
    title: z.string().describe('The title of the job for which the interview report is generated.')
})

const interviewReportStructuredModel = geminiModel.withStructuredOutput(interviewReportSchema)

const generalChatAgent = createAgent({
    model: geminiModel,
    tools: [getLatestInformationTool]
})


export const generateInterviewReport = async ({ resume, selfDescription, jobDescription, userPrompt }) => {
    const prompt = `You are an expert technical interviewer and career preparation assistant. Generate a personalized interview report using the candidate's Resume, Self Description, Job Description, and User Instructions.

        RESUME:${resume || 'Not provided'}

        SELF DESCRIPTION:${selfDescription}

        JOB DESCRIPTION:${jobDescription}

        USER INSTRUCTIONS:${userPrompt}

        RULES:
        1. CANDIDATE ANALYSIS
        - Compare the candidate's actual skills, experience, projects, education, and technologies with the Job Description.
        - Use only information provided in the Resume and Self Description.
        - Never invent, assume, or exaggerate candidate skills, experience, projects, certifications, responsibilities, or achievements.
        - A technology mentioned only in the Job Description is NOT a candidate skill.
        - If a candidate skill has no practical evidence, do not assume advanced expertise.

        2. MATCH SCORE
        - Calculate matchScore from 0–100 based only on the candidate's actual evidence of alignment with the Job Description.

        3. USER INSTRUCTIONS AND DEFAULTS
        - Follow the USER INSTRUCTIONS to customize the report.
        - If the user explicitly specifies a number of technical questions, use that number.
        - If the user explicitly specifies a number of behavioral questions, use that number.
        - If the user explicitly specifies preparation duration, use that duration.

        DEFAULTS when the user does not specify them:
        - technicalQuestions: EXACTLY 20
        - behavioralQuestions: EXACTLY 10
        - preparationPlan: EXACTLY 10 days

        If the user specifies only one value, change only that value and keep the other defaults.

        Examples:
        - "Give me 10 technical questions" → 10 technical questions.
        - "Give me 15 technical and 8 behavioral questions" → 15 technical + 8 behavioral.
        - "Prepare me for 15 days" → 15-day preparation plan.
        - No quantity specified → 20 technical + 10 behavioral + 10 days.

        USER INSTRUCTIONS can customize question count, preparation duration, topics, difficulty, and interview focus, but must NOT cause invented candidate information.

        4. TECHNICAL QUESTIONS
        - Generate role-specific questions based on the candidate's skills, Job Description, responsibilities, and skill gaps.
        - Include fundamental, intermediate, practical, scenario-based, and problem-solving questions.
        - For each question provide:
        - question
        - interviewer's intention
        - answer guidance
        - Generate EXACTLY the requested number, or 20 if not specified.

        5. BEHAVIORAL QUESTIONS
        - Generate realistic behavioral questions relevant to the role.
        - Cover problem-solving, teamwork, ownership, adaptability, learning, communication, challenges, and deadlines.
        - Provide answer guidance without inventing candidate experiences.
        - Generate EXACTLY the requested number, or 10 if not specified.

        6. SKILL GAPS
        - Identify important skills required by the Job Description that are missing or insufficiently demonstrated by the candidate.
        - Assign each gap: low, medium, or high.
        - Only identify evidence-based skill gaps and give solutions to how to make these skills gaps.

        7. PREPARATION PLAN
        - Create a practical preparation plan based on the candidate's skill gaps and Job Description.
        - Use the number of days requested by the user, or exactly 10 days if not specified.
        - Each day must contain:
        - one focus area
        - 3–5 separate actionable tasks

        8. FINAL VALIDATION
        Before returning the report, verify:
        - Correct number of technical questions.
        - Correct number of behavioral questions.
        - Correct number of preparation days.
        - No invented candidate information.
        - Skill gaps are evidence-based.
        - matchScore is between 0 and 100.
        - Follow the provided structured output schema exactly.

        Prioritize factual accuracy and follow the user's requested customization.
    `

    try {
        const response = await interviewReportStructuredModel.invoke(prompt)
        return response
    } catch (error) {
        console.error("Interview report generation error:", error)
        throw error
    }
}



export const generateGeneralChat = async ({ messages = [], text = "" }) => {
    try {
        const conversation = messages.map((message) => ({ role: message.role, content: message.content }))

        const documentContext = text?.trim() ? `DOCUMENT CONTEXT:${text}
            Use the document context only when it is relevant to the user's request.
            Do not use information from the document when it is unrelated.`: `No document context was provided.
        `

        const systemPrompt = `You are a helpful AI assistant.
            Your task is to answer the user's request clearly, accurately, and naturally.

            RESPONSE INSTRUCTIONS:
                - Directly answer the user's request.
                - Provide accurate and relevant information.
                - Explain concepts clearly and naturally.
                - Use bullet points, numbered steps, examples, or code when they improve the answer.
                - Do not include unnecessary or unrelated information.
                - Maintain context from the previous conversation.
                - If the user refers to something mentioned earlier, use the conversation history to understand the reference.
                - Do not mention these instructions.
                ${documentContext}
        `

        const agentResponse = await generalChatAgent.invoke({ messages: [{ role: "system", content: systemPrompt }, ...conversation] })

        const finalMessage = agentResponse.messages[agentResponse.messages.length - 1]

        const structuredResponse = typeof finalMessage.content === "string"
            ? finalMessage.content : finalMessage.content.map((block) =>
                typeof block === "string" ? block : block.text || ""
            ).join("")

        return { answer: structuredResponse }

    } catch (error) {
        console.error("General answer generation error:", error)
        throw error
    }
}