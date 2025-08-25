import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <nav className="bg-blue-800 shadow-lg border-t border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center mr-3">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                </svg>
              </div>
              <span className="text-white text-lg font-semibold">Navigation</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/") ? "bg-emerald-700 text-white" : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
              }`}
            >
              Accueil
            </Link>

            {user && (
              <>
                <Link
                  to="/simulate"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/simulate")
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                >
                  Simuler
                </Link>
                <Link
                  to="/library"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/library")
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                >
                  Bibliothèque
                </Link>
                <Link
                  to="/history"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/history")
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                >
                  Historique
                </Link>
                <Link
                  to="/favorites"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/favorites")
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                >
                  Favoris
                </Link>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/dashboard")
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/admin")
                        ? "bg-violet-700 text-white"
                        : "text-violet-200 hover:bg-violet-700 hover:text-white"
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-emerald-100 text-sm">Bonjour, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-emerald-900">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive("/") ? "bg-emerald-700 text-white" : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
              }`}
            >
              Accueil
            </Link>

            {user && (
              <>
                <Link
                  to="/simulate"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive("/simulate")
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                >
                  Simuler
                </Link>
                <Link
                  to="/library"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive("/library")
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                >
                  Bibliothèque
                </Link>
                <Link
                  to="/history"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive("/history")
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                >
                  Historique
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive("/favorites")
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                >
                  Favoris
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive("/dashboard")
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive("/admin")
                        ? "bg-violet-700 text-white"
                        : "text-violet-200 hover:bg-violet-700 hover:text-white"
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </>
            )}

            {user ? (
              <div className="border-t border-emerald-700 pt-4">
                <div className="px-3 py-2">
                  <span className="text-emerald-100 text-sm">Bonjour, {user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="border-t border-emerald-700 pt-4 space-y-1">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-700 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
