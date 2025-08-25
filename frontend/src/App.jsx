import { Routes, Route } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import Header from "./components/Header"
import Navbar from "./components/NavBar"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminProtectedRoute from "./components/AdminProtectedRoute"
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
