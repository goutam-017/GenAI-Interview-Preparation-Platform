import ProtectedRoute from "@/components/ProtectedRoute"
import Navbar from "@/components/Navbar"
import InterviewProvider from "../../contexts/interview.context"

export default function ProtectedLayout({ children }) {
    return (
        <ProtectedRoute>
            <InterviewProvider>
                <Navbar />
                {children}
            </InterviewProvider>
        </ProtectedRoute>
    )
}