import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { useAuth } from "../context/AuthContext"
import RoleBadge from "../components/RoleBadge"
import { AdminOnly } from "../components/ConditionalRender"

const Admin = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [showUserForm, setShowUserForm] = useState(false)
  const [users, setUsers] = useState([
    { id: 1, name: "Marie Dupont", email: "marie@example.com", role: "Étudiant", date: "2024-01-15" },
    { id: 2, name: "Pierre Martin", email: "pierre@example.com", role: "Professeur", date: "2024-01-10" },
    { id: 3, name: "Sophie Bernard", email: "sophie@example.com", role: "Étudiant", date: "2024-01-20" }
  ])
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Étudiant"
  })
  const [formErrors, setFormErrors] = useState({})

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

  const validateForm = () => {
    const errors = {}
    
    if (!userForm.name.trim()) {
      errors.name = "Le nom est requis"
    } else if (userForm.name.trim().length < 2) {
      errors.name = "Le nom doit contenir au moins 2 caractères"
    }

    if (!userForm.email.trim()) {
      errors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userForm.email)) {
      errors.email = "Format d'email invalide"
    } else if (users.some(user => user.email === userForm.email)) {
      errors.email = "Cet email est déjà utilisé"
    }

    if (!userForm.password) {
      errors.password = "Le mot de passe est requis"
    } else if (userForm.password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères"
    }

    if (userForm.password !== userForm.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    return errors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handleSubmitUser = (e) => {
    e.preventDefault()
    const errors = validateForm()
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const newUser = {
      id: users.length + 1,
      name: userForm.name.trim(),
      email: userForm.email.trim(),
      role: userForm.role,
      date: new Date().toISOString().split('T')[0]
    }

    setUsers(prev => [...prev, newUser])
    setUserForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Étudiant"
    })
    setFormErrors({})
    setShowUserForm(false)
    toast.success("Utilisateur créé avec succès!")
  }

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId))
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
            <div className="text-3xl font-bold text-blue-600 mb-2">{users.length}</div>
            <div className="text-gray-600">👥 Utilisateurs</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{simpleExperiments.length}</div>
            <div className="text-gray-600">🧪 Expériences</div>
          </div>
        </div>

        {/* Utilisateurs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-900">👥 Utilisateurs</h2>
            <button
              onClick={() => setShowUserForm(!showUserForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {showUserForm ? "❌ Annuler" : "➕ Ajouter Utilisateur"}
            </button>
          </div>

          {/* Formulaire d'inscription */}
          {showUserForm && (
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">📝 Nouveau Utilisateur</h3>
              <form onSubmit={handleSubmitUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userForm.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ex: Marie Dupont"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rôle *
                    </label>
                    <select
                      name="role"
                      value={userForm.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Étudiant">Étudiant</option>
                      <option value="Professeur">Professeur</option>
                      <option value="Admin">Administrateur</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="marie@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={userForm.password}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Minimum 6 caractères"
                    />
                    {formErrors.password && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmer mot de passe *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={userForm.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Répéter le mot de passe"
                    />
                    {formErrors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserForm(false)
                      setUserForm({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        role: "Étudiant"
                      })
                      setFormErrors({})
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    ✅ Créer Utilisateur
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {users.map((user) => (
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
