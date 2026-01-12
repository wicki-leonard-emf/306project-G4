import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import imgLogo from "figma:asset/d0fc03f5c47a5583e2cfa35ac5f6aa36545efb07.png"
import { authService } from "../services/authService"

interface LoginProps {
  onLogin: (email: string, password: string) => void
  error?: string
  onShowRegister?: () => void
}

export function Login({ onLogin, error, onShowRegister }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(error || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    setIsLoading(true)

    try {
      await authService.login(email, password)
      onLogin(email, password)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur de connexion"
      setLoginError(message)
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
              Bienvenue sur SensorHub
            </h1>
            <p className="text-[#717680] text-center">
              Connectez-vous pour accéder au tableau de bord
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
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
                  Erreur de connexion
                </p>
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
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
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="size-4 rounded border-[#d5d7da] text-[#7f56d9] focus:ring-[#7f56d9]"
                />
                <span className="text-sm text-[#535862]">
                  Se souvenir de moi
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-[#7f56d9] hover:text-[#6941c6] transition-colors"
              >
                Mot de passe oublié ?
              </button>
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
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#717680]">
              En vous connectant, vous acceptez nos{" "}
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
            Vous n'avez pas de compte ?{" "}
            <button
              type="button"
              onClick={onShowRegister}
              className="font-bold hover:underline"
            >
              Créer un compte
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
