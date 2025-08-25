import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
        🧪 ChemLab Sim
      </h1>
      <p className="text-lg text-slate-600 mb-8 text-center max-w-xl">
        Explorez le monde fascinant de la chimie grâce à notre plateforme de simulation d'expériences chimiques interactive et éducative.
      </p>
      <Link 
        to="/login" 
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        Commencer 
      </Link>
    </div>
  )
}
