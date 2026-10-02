import { Brain, Code2, MessageSquare, FileTextIcon, BrainIcon, BriefcaseBusinessIcon, UserRoundIcon, SlidersHorizontalIcon, MessageCircleIcon, Navigation } from "lucide-react"


export const navItems = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Interview',
        path: '/interview',
    },
    {
        name: 'Chat with AI',
        path: '/chats',
    }
]

export const SIDEBAR_NAV_ITEMS = [
    {
        id: 'technical',
        label: 'Technical Questions',
        icon: Code2,
    },
    {
        id: 'behavioral',
        label: 'Behavioral Questions',
        icon: MessageSquare,
    },
    {
        id: 'roadmap',
        label: 'Roadmap',
        icon: Navigation,
    },
    {
        id: 'skillgaps',
        label: 'Skill Gaps',
        icon: Brain,
    },
]


export const features = [
    {
        icon: FileTextIcon,
        title: "Resume-Based Preparation",
        description:
            "Upload your resume and let AI understand your skills, experience, projects, and background to create relevant interview preparation.",
    },
    {
        icon: BriefcaseBusinessIcon,
        title: "Job Description Analysis",
        description:
            "Provide the job description you are targeting and get interview preparation tailored to the skills, requirements, and responsibilities of that position.",
    },
    {
        icon: UserRoundIcon,
        title: "Personal Profile",
        description:
            "Add a brief self-description so the AI can understand your background, career goals, strengths, and areas you want to focus on.",
    },
    {
        icon: SlidersHorizontalIcon,
        title: "Custom Preparation",
        description:
            "Customize your preparation by choosing the topics, difficulty, interview type, number of questions, and other preferences.",
    },
    {
        icon: BrainIcon,
        title: "AI-Powered Interview Report",
        description:
            "Get a detailed AI-generated report analyzing your interview performance, answers, strengths, weaknesses, and areas for improvement.",
    },
    {
        icon: MessageCircleIcon,
        title: "AI Career Assistant",
        description:
            "Chat directly with AI to ask questions, clarify concepts, solve interview problems, or get personalized guidance whenever you need it.",
    },
]

export const steps = [
    {
        number: "01",
        title: "Enter Job Description"
    },
    {
        number: "02",
        title: "Upload Your Resume"
    },
    {
        number: "03",
        title: "Tell Us About Yourself"
    },
    {
        number: "04",
        title: "Add Custom Instructions"
    },
    {
        number: "05",
        title: "Get Your AI-Powered Report"
    }
]