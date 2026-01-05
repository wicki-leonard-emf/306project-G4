import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import imgLogo from "figma:asset/d0fc03f5c47a5583e2cfa35ac5f6aa36545efb07.png"

interface RegisterProps {
  onRegister: (email: string, password: string) => void
  onBackToLogin: () => void
  error?: string
}

export function Register({ onRegister, onBackToLogin, error }: RegisterProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState(error || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setRegisterError("Les mots de passe ne correspondent pas")
      return
    }

    // Validate password length
    if (password.length < 6) {
      setRegisterError("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    setIsLoading(true)

    try {
      const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "")

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de l'inscription")
      }

      onRegister(email, password)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'inscription"
      setRegisterError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7f56d9] via-[#9b87f5] to-[#6941c6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="size-16 mb-4 rounded-xl overflow-hidden shadow-lg">
              <img
                alt="SensorHub Logo"
                className="size-full object-cover"
                src={imgLogo}
              />
            </div>
            <h1 className="text-2xl font-bold text-[#181d27] mb-2">
              Créer un compte
            </h1>
            <p className="text-[#717680] text-center">
              Inscrivez-vous pour accéder à SensorHub
            </p>
          </div>

          {/* Error Message */}
          {registerError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <svg
                className="size-5 text-red-600 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800 mb-1">
                  Erreur
                </p>
                <p className="text-sm text-red-700">{registerError}</p>
              </div>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#414651] mb-2"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#414651] mb-2"
              >
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Entrez un mot de passe (min 6 caractères)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-[#414651] mb-2"
              >
                Confirmer le mot de passe
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="size-4 rounded border-[#d5d7da] text-[#7f56d9] focus:ring-[#7f56d9]"
                  required
                />
                <span className="text-sm text-[#535862]">
                  J'accepte les conditions d'utilisation et la politique de confidentialité
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Inscription en cours...</span>
                </>
              ) : (
                <span>Créer un compte</span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#717680]">
              En créant un compte, vous acceptez nos{" "}
              <button className="text-[#7f56d9] hover:underline font-semibold">
                conditions d'utilisation
              </button>{" "}
              et notre{" "}
              <button className="text-[#7f56d9] hover:underline font-semibold">
                politique de confidentialité
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/90">
            Vous avez déjà un compte ?{" "}
            <button
              type="button"
              onClick={onBackToLogin}
              className="font-bold hover:underline"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>
    </div>
  )
}
