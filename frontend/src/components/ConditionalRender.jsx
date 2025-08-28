import { useAuth } from "../context/AuthContext"

// Component for role-based conditional rendering
const ConditionalRender = ({ 
  roles = [], 
  requireAuth = true, 
  fallback = null, 
  children 
}) => {
  const { user, isAuthenticated } = useAuth()

  // Check authentication if required
  if (requireAuth && !isAuthenticated) {
    return fallback
  }

  // If no roles specified, just check authentication
  if (roles.length === 0) {
    return children
  }

  // Check if user has required role
  if (user && roles.includes(user.role)) {
    return children
  }

  return fallback
}

// Specific role components for easier use
export const AdminOnly = ({ children, fallback = null }) => (
  <ConditionalRender roles={["Admin"]} fallback={fallback}>
    {children}
  </ConditionalRender>
)

export const ProfessorOnly = ({ children, fallback = null }) => (
  <ConditionalRender roles={["Professeur"]} fallback={fallback}>
    {children}
  </ConditionalRender>
)

export const ProfessorAndAdmin = ({ children, fallback = null }) => (
  <ConditionalRender roles={["Professeur", "Admin"]} fallback={fallback}>
    {children}
  </ConditionalRender>
)

export const StudentOnly = ({ children, fallback = null }) => (
  <ConditionalRender roles={["Étudiant"]} fallback={fallback}>
    {children}
  </ConditionalRender>
)

export const AuthenticatedOnly = ({ children, fallback = null }) => (
  <ConditionalRender requireAuth={true} fallback={fallback}>
    {children}
  </ConditionalRender>
)

export default ConditionalRender
