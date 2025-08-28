import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Spinner from "./Spinner"

const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Spinner />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== "Admin") {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default AdminProtectedRoute
