const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "")

const TOKEN_KEY = "auth_token"

export interface User {
    id: string
    email: string
    role: string
}

export interface AuthResponse {
    user: User
    token: string
}

class AuthService {
    // Store token in localStorage
    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token)
    }

    // Get token from localStorage
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY)
    }

    // Remove token from localStorage
    removeToken(): void {
        localStorage.removeItem(TOKEN_KEY)
    }

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return this.getToken() !== null
    }

    // Get Authorization header
    getAuthHeader(): HeadersInit {
        const token = this.getToken()
        if (token) {
            return {
                Authorization: `Bearer ${token}`,
            }
        }
        return {}
    }

    // Login
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Login failed")
        }

        const data: AuthResponse = await response.json()
        this.setToken(data.token)
        return data
    }

    // Register
    async register(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Registration failed")
        }

        const data: AuthResponse = await response.json()
        this.setToken(data.token)
        return data
    }

    // Get current user
    async getCurrentUser(): Promise<User> {
        const token = this.getToken()
        if (!token) {
            throw new Error("No token found")
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
                ...this.getAuthHeader(),
            },
        })

        if (!response.ok) {
            // If token is invalid, remove it
            if (response.status === 401) {
                this.removeToken()
            }
            const errorData = await response.json()
            throw new Error(errorData.error || "Failed to get user info")
        }

        const data = await response.json()
        return data.user
    }

    // Logout
    async logout(): Promise<void> {
        try {
            // Call logout endpoint (optional, since JWT is stateless)
            await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: "POST",
                headers: {
                    ...this.getAuthHeader(),
                },
            })
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            // Always remove token from localStorage
            this.removeToken()
        }
    }

    // Check token validity
    async validateToken(): Promise<boolean> {
        try {
            await this.getCurrentUser()
            return true
        } catch {
            return false
        }
    }
}

export const authService = new AuthService()
