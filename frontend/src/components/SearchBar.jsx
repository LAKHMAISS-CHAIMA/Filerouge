import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"

export default function SearchBar({ placeholder = "Rechercher une substance...", className = "", onResults }) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const searchSubstances = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      setShowResults(false)
      return
    }

    setLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:5000/api/substances/search?q=${encodeURIComponent(searchQuery)}`
      )
      setResults(response.data.substances || [])
      setShowResults(true)

      if (onResults) {
        onResults(response.data.substances || [])
      }

      toast.success("Résultats trouvés ")
    } catch (error) {
      console.error("Erreur de recherche:", error)
      toast.error("Erreur lors de la recherche ")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    searchSubstances(query)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 2) {
      const timeoutId = setTimeout(() => {
        searchSubstances(value)
      }, 500)
      return () => clearTimeout(timeoutId)
    } else {
      setResults([])
      setShowResults(false)
    }
  }

  const selectSubstance = (substance) => {
    setQuery(substance.name)
    setShowResults(false)
    if (onResults) {
      onResults([substance])
    }
    toast.success(`Substance "${substance.name}" sélectionnée`)
  }

  return (
    <div className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white/80 backdrop-blur-sm"
          />
          {loading && (
            <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-600 animate-spin" />
          )}
        </div>
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((substance, index) => (
            <div
              key={substance.cid || index}
              onClick={() => selectSubstance(substance)}
              className="p-4 hover:bg-emerald-50 cursor-pointer border-b border-slate-100 last:border-b-0"
            >
              <div className="font-medium text-slate-800">{substance.name}</div>
              {substance.formula && <div className="text-sm text-slate-600 font-mono">{substance.formula}</div>}
              {substance.cid && <div className="text-xs text-slate-500">CID: {substance.cid}</div>}
            </div>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && !loading && query.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-lg z-50 p-4 text-center text-slate-500">
          Aucune substance trouvée pour "{query}"
        </div>
      )}
    </div>
  )
}
