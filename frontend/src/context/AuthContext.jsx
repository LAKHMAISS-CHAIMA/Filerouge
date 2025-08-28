import { createContext, useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"
import { authAPI } from "../services/api"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const response = await authAPI.getMe()
          if (response.success) {
            setUser(response.user)
          } else {
            localStorage.removeItem("token")
          }
        } catch (error) {
          console.error("Auth initialization error:", error)
          localStorage.removeItem("token")
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      if (response.success && response.token) {
        localStorage.setItem("token", response.token)
        setUser(response.user)
        toast.success("Connexion réussie!")
        return { success: true }
      }
      return { success: false }
    } catch (error) {
      console.error("Login error:", error)
      toast.error(error.message || "Erreur de connexion")
      return { success: false }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      if (response.success && response.token) {
        localStorage.setItem("token", response.token)
        setUser(response.user)
        toast.success("Inscription réussie!")
        return { success: true }
      }
      return { success: false }
    } catch (error) {
      console.error("Registration error:", error)
      toast.error(error.message || "Erreur lors de l'inscription")
      return { success: false }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    toast.success("Déconnexion réussie")
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "Admin",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
