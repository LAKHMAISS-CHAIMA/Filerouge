import axios from "axios"
import toast from "react-hot-toast"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
      toast.error("Session expirée, veuillez vous reconnecter")
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getProfile: () => api.get("/auth/profile"),
}

// Substances API
export const substancesAPI = {
  search: (query) => api.get(`/substances/search?q=${encodeURIComponent(query)}`),
  getAll: (page = 1, limit = 20) => api.get(`/substances?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/substances/${id}`),
  addToFavorites: (substanceId) => api.post(`/substances/${substanceId}/favorite`),
  removeFromFavorites: (substanceId) => api.delete(`/substances/${substanceId}/favorite`),
  getFavorites: () => api.get("/substances/favorites"),
}

// Reactions API
export const reactionsAPI = {
  simulate: (reactionData) => api.post("/reactions/simulate", reactionData),
  getHistory: (page = 1, limit = 20) => api.get(`/reactions/history?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/reactions/${id}`),
  delete: (id) => api.delete(`/reactions/${id}`),
}

// Experiments API
export const experimentsAPI = {
  create: (experimentData) => api.post("/experiments", experimentData),
  getAll: (page = 1, limit = 20) => api.get(`/experiments?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/experiments/${id}`),
  update: (id, data) => api.put(`/experiments/${id}`, data),
  delete: (id) => api.delete(`/experiments/${id}`),
  getUserExperiments: (page = 1, limit = 20) => api.get(`/experiments/user?page=${page}&limit=${limit}`),
}

// Admin API
export const adminAPI = {
  getUsers: (page = 1, limit = 20) => api.get(`/admin/users?page=${page}&limit=${limit}`),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getStats: () => api.get("/admin/stats"),
  getAllExperiments: (page = 1, limit = 20) => api.get(`/admin/experiments?page=${page}&limit=${limit}`),
  getAllReactions: (page = 1, limit = 20) => api.get(`/admin/reactions?page=${page}&limit=${limit}`),
}

export default api
