import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

const SubstanceLibrary = () => {
  const [substances, setSubstances] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  const simpleSubstances = [
    { id: 1, name: "Eau", formula: "H₂O", type: "Liquide" },
    { id: 2, name: "Sel", formula: "NaCl", type: "Solide" },
    { id: 3, name: "Oxygène", formula: "O₂", type: "Gaz" },
    { id: 4, name: "Acide", formula: "HCl", type: "Liquide" },
    { id: 5, name: "Soude", formula: "NaOH", type: "Solide" },
    { id: 6, name: "Méthane", formula: "CH₄", type: "Gaz" }
  ]

  useEffect(() => {
    setTimeout(() => {
      setSubstances(simpleSubstances)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredSubstances = substances.filter(substance =>
    substance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    substance.formula.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          🧪 Bibliothèque de Substances
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <input
            type="text"
            placeholder="Rechercher une substance..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-2 text-sm text-gray-600">
            {filteredSubstances.length} substance(s) trouvée(s)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubstances.map((substance) => (
            <div key={substance.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{substance.name}</h3>
              <p className="text-blue-600 font-mono text-lg mb-2">{substance.formula}</p>
              <p className="text-gray-600 mb-4">Type: {substance.type}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => toast.info(`Détails de ${substance.name}`)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Détails
                </button>
                <button
                  onClick={() => window.location.href = `/simulate?substance=${substance.id}`}
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Utiliser
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSubstances.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune substance trouvée</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SubstanceLibrary
