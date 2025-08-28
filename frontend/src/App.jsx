import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminProtectedRoute from "./components/AdminProtectedRoute"
import RoleProtectedRoute from "./components/RoleProtectedRoute"
import UnauthorizedPage from "./components/UnauthorizedPage"
import Spinner from "./components/Spinner"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SimulateReaction from "./pages/SimulateReaction"
import SubstanceLibrary from "./pages/SubstanceLibrary"
import ExperimentHistory from "./pages/ExperienceHistory"
import CreateExperiment from "./pages/CreateExperience"
import UserDashboard from "./pages/UserDashboard"
import Admin from "./pages/Admin"
import Favorites from "./pages/Favorites"
import ResultsDisplay from "./pages/ResultsDisplay"

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route
            path="/simulate"
            element={
              <ProtectedRoute>
                <SimulateReaction />
              </ProtectedRoute>
            }
          />

          <Route
            path="/substance-library"
            element={
              <ProtectedRoute>
                <SubstanceLibrary />
              </ProtectedRoute>
            }
          />

          <Route
            path="/experience-history"
            element={
              <ProtectedRoute>
                <ExperimentHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-experience"
            element={
              <ProtectedRoute>
                <CreateExperiment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/results/:id"
            element={
              <ProtectedRoute>
                <ResultsDisplay />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <RoleProtectedRoute allowedRoles={["Admin"]} showUnauthorized={true}>
                <Admin />
              </RoleProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
