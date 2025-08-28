import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Spinner from "./Spinner"
import UnauthorizedPage from "./UnauthorizedPage"

const RoleProtectedRoute = ({ children, allowedRoles = [], showUnauthorized = false }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Spinner />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    if (showUnauthorized) {
      return <UnauthorizedPage />
    }
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default RoleProtectedRoute
