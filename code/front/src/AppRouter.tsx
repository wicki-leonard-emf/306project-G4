import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import App from "./App"
import { ProtectedRoute } from "./ProtectedRoute"
import { authService } from "./services/authService"

export function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists and is valid
        if (authService.isAuthenticated()) {
          const isValid = await authService.validateToken()
          setIsAuthenticated(isValid)
        }
      } catch (err) {
        console.error("Auth check error:", err)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setIsAuthenticated(false)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Register Route */}
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterPage onRegisterSuccess={handleRegisterSuccess} />
            )
          }
        />

        {/* Protected Dashboard Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
              <App onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
