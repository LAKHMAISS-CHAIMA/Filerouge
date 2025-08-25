import { useState, useEffect, useContext } from "react"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import Spinner from "../components/Spinner"

const HeartIcon = ({ className, filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const TrashIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

const Favorites = () => {
  const { user } = useContext(useAuth)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const response = await getFavorites()
      setFavorites(response.data)
    } catch (error) {
      toast.error("Erreur lors du chargement des favoris")
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId)
      setFavorites(favorites.filter((fav) => fav._id !== favoriteId))
      toast.success("Favori supprimé avec succès")
    } catch (error) {
      toast.error("Erreur lors de la suppression du favori")
    }
  }

  if (loading) return <Spinner />

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <HeartIcon className="h-8 w-8 text-red-500" filled={true} />
          <h1 className="text-3xl font-bold text-slate-800">Mes Favoris</h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <HeartIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-600 mb-2">Aucun favori</h2>
            <p className="text-slate-500">
              Ajoutez des substances ou des expériences à vos favoris pour les retrouver facilement.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {favorite.type === "substance" ? favorite.substance.name : favorite.experiment.title}
                  </h3>
                  <button
                    onClick={() => handleRemoveFavorite(favorite._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>

                {favorite.type === "substance" ? (
                  <div>
                    <p className="text-slate-600 mb-2">
                      <span className="font-medium">Formule:</span> {favorite.substance.formula}
                    </p>
                    <p className="text-slate-600 mb-2">
                      <span className="font-medium">Masse molaire:</span> {favorite.substance.molecularWeight} g/mol
                    </p>
                    <div className="mt-4">
                      <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm">
                        Substance
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-slate-600 mb-2">
                      <span className="font-medium">Réactifs:</span> {favorite.experiment.reactants.join(", ")}
                    </p>
                    <p className="text-slate-600 mb-2">
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(favorite.experiment.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mt-4">
                      <span className="inline-block bg-violet-100 text-violet-800 px-2 py-1 rounded-full text-sm">
                        Expérience
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-4 text-sm text-slate-500">
                  Ajouté le {new Date(favorite.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
