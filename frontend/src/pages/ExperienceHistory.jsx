import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

const ExperimentHistory = () => {
  const [experiments, setExperiments] = useState([])
  const [loading, setLoading] = useState(true)

  const simpleExperiments = [
    {
      id: 1,
      name: "Acide + Base",
      reaction: "HCl + NaOH → NaCl + H₂O",
      status: "success",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Combustion",
      reaction: "CH₄ + O₂ → CO₂ + H₂O",
      status: "success",
      date: "2024-01-14"
    },
    {
      id: 3,
      name: "Précipitation",
      reaction: "AgNO₃ + NaCl → AgCl + NaNO₃",
      status: "error",
      date: "2024-01-12"
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setExperiments(simpleExperiments)
      setLoading(false)
    }, 1000)
  }, [])

  const deleteExperiment = (id) => {
    if (window.confirm("Supprimer cette expérience ?")) {
      setExperiments(experiments.filter(exp => exp.id !== id))
      toast.success("Expérience supprimée")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          📊 Historique des Expériences
        </h1>

        {experiments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">Aucune expérience trouvée</p>
            <button 
              onClick={() => window.location.href = '/simulate'}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Créer une expérience
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {experiments.map((experiment) => (
              <div key={experiment.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{experiment.name}</h3>
                      <span className={`px-2 py-1 rounded text-sm ${
                        experiment.status === "success" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {experiment.status === "success" ? "✅ Réussie" : "❌ Échouée"}
                      </span>
                    </div>
                    
                    <p className="text-blue-600 font-mono text-lg mb-2">{experiment.reaction}</p>
                    <p className="text-gray-600 text-sm">Date: {experiment.date}</p>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => toast.info(`Détails de ${experiment.name}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Détails
                    </button>
                    <button
                      onClick={() => window.location.href = `/simulate?experiment=${experiment.id}`}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Refaire
                    </button>
                    <button
                      onClick={() => deleteExperiment(experiment.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExperimentHistory
