import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

const Admin = () => {
  const [loading, setLoading] = useState(true)

  const simpleUsers = [
    { id: 1, name: "Marie Dupont", email: "marie@example.com", role: "Étudiant", date: "2024-01-15" },
    { id: 2, name: "Pierre Martin", email: "pierre@example.com", role: "Professeur", date: "2024-01-10" },
    { id: 3, name: "Sophie Bernard", email: "sophie@example.com", role: "Étudiant", date: "2024-01-20" }
  ]

  const simpleExperiments = [
    { id: 1, name: "Neutralisation", author: "Marie", date: "2024-01-25" },
    { id: 2, name: "Combustion", author: "Pierre", date: "2024-01-24" },
    { id: 3, name: "Précipitation", author: "Sophie", date: "2024-01-23" }
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const handleDeleteUser = (userId) => {
    toast.success("Utilisateur supprimé")
  }

  const handleDeleteExperiment = (experimentId) => {
    toast.success("Expérience supprimée")
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
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">🛡️ Panel d'Administration</h1>
          <p className="text-gray-600">Gestion simple des utilisateurs et expériences</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{simpleUsers.length}</div>
            <div className="text-gray-600">👥 Utilisateurs</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{simpleExperiments.length}</div>
            <div className="text-gray-600">🧪 Expériences</div>
          </div>
        </div>

        {/* Utilisateurs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">👥 Utilisateurs</h2>
          <div className="space-y-3">
            {simpleUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email} • {user.role}</div>
                  <div className="text-xs text-gray-500">Inscrit le {user.date}</div>
                </div>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  🗑️ Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Expériences */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">🧪 Expériences</h2>
          <div className="space-y-3">
            {simpleExperiments.map((experiment) => (
              <div key={experiment.id} className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{experiment.name}</div>
                  <div className="text-sm text-gray-600">Créé par {experiment.author}</div>
                  <div className="text-xs text-gray-500">Date: {experiment.date}</div>
                </div>
                <button
                  onClick={() => handleDeleteExperiment(experiment.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  🗑️ Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
