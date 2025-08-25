import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

const UserDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const simpleStats = {
    experiments: 3,
    favorites: 2,
    successRate: "100%"
  }

  const simpleFavorites = [
    { id: 1, name: "Acide chlorhydrique", formula: "HCl" },
    { id: 2, name: "Hydroxyde de sodium", formula: "NaOH" }
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const handleLogout = () => {
    logout()
    toast.success("Déconnexion réussie")
    navigate("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header avec profil et logout */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">👋 Bienvenue, {user?.name || "Utilisateur"}</h1>
                <p className="text-gray-600">{user?.email || "user@example.com"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              🚪 Déconnexion
            </button>
          </div>
        </div>

        {/* Statistiques simples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{simpleStats.experiments}</div>
            <div className="text-gray-600">🧪 Expériences</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{simpleStats.favorites}</div>
            <div className="text-gray-600">❤️ Favoris</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{simpleStats.successRate}</div>
            <div className="text-gray-600">✅ Taux de réussite</div>
          </div>
        </div>

        {/* Favoris simples */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">❤️ Mes Favoris</h2>
          <div className="space-y-3">
            {simpleFavorites.map((favorite) => (
              <div key={favorite.id} className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{favorite.name}</div>
                  <div className="text-blue-600 font-mono">{favorite.formula}</div>
                </div>
                <button 
                  onClick={() => toast.success("Favori supprimé")}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">🚀 Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/create-experience")}
              className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🧪</div>
              <div>Nouvelle Expérience</div>
            </button>
            <button
              onClick={() => navigate("/substance-library")}
              className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📚</div>
              <div>Bibliothèque</div>
            </button>
            <button
              onClick={() => navigate("/experience-history")}
              className="p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📋</div>
              <div>Historique</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
