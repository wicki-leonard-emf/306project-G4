import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Login } from "../components/Login"

interface LoginPageProps {
  onLoginSuccess: () => void
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const handleLogin = (email: string, password: string) => {
    setError("")
    onLoginSuccess()
    navigate("/")
  }

  const handleShowRegister = () => {
    navigate("/register")
  }

  return (
    <Login
      onLogin={handleLogin}
      error={error}
      onShowRegister={handleShowRegister}
    />
  )
}
