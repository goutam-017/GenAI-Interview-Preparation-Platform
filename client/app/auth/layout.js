import ProtectedRoute from "@/components/ProtectedRoute"

export default function LoginLayout({ children }) {
  return (
    <ProtectedRoute requireAuth={false}>
      {children}
    </ProtectedRoute>
  )
}