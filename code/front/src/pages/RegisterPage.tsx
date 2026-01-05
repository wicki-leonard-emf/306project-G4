import { useNavigate } from "react-router-dom"
import { Register } from "../components/Register"

interface RegisterPageProps {
  onRegisterSuccess: () => void
}

export function RegisterPage({ onRegisterSuccess }: RegisterPageProps) {
  const navigate = useNavigate()

  const handleRegister = (email: string, password: string) => {
    onRegisterSuccess()
    navigate("/")
  }

  const handleBackToLogin = () => {
    navigate("/login")
  }

  return (
    <Register
      onRegister={handleRegister}
      onBackToLogin={handleBackToLogin}
    />
  )
}
