import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const ResultsDisplay = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { results } = location.state || {}

  useEffect(() => {
    if (!results) {
      navigate("/simulate")
    }
  }, [results, navigate])

  if (!results) return null

  const chartData = [
    ...(results.reactantDetails || []).map(r => ({
      name: r.name,
      quantity: r.quantity || 0,
      type: "Réactif"
    })),
    ...(results.productDetails || []).map(p => ({
      name: p.name,
      quantity: p.quantity || 0,
      type: "Produit"
    }))
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Résultats de la Réaction</h1>

        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Équation</h2>
          <p className="font-mono text-center">
            {results.reactants.join(" + ")} → {results.products.join(" + ")}
          </p>
        </div>

        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Tableau des résultats</h2>
          <table className="w-full border border-slate-300 text-center">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-2">Nom</th>
                <th className="border p-2">Formule</th>
                <th className="border p-2">Quantité</th>
                <th className="border p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{results.reactantDetails?.find(r => r.name === item.name)?.formula || results.productDetails?.find(p => p.name === item.name)?.formula}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Graphique des quantités</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/simulate")}
            className="bg-emerald-600 text-white px-6 py-2 rounded"
          >
            Nouvelle simulation
          </button>
          <button
            onClick={() => navigate("/history")}
            className="bg-violet-600 text-white px-6 py-2 rounded"
          >
            Voir l'historique
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsDisplay
