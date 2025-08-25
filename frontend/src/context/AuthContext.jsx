import { createContext, useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"

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
    const token = localStorage.getItem("token")
    if (token) {
      setUser({
        name: "Utilisateur Test",
        email: "test@example.com",
        role: "user"
      })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          name: "Utilisateur Test",
          email: email,
          role: "user"
        }
        localStorage.setItem("token", "mock-token")
        setUser(mockUser)
        toast.success("Connexion réussie!")
        resolve({ success: true })
      }, 500)
    })
  }

  const register = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          name: userData.username || userData.name,
          email: userData.email,
          role: "user"
        }
        localStorage.setItem("token", "mock-token")
        setUser(mockUser)
        toast.success("Inscription réussie!")
        resolve({ success: true })
      }, 500)
    })
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
    isAdmin: user?.role === "admin",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
