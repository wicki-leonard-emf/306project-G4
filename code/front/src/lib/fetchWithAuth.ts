import { authService } from "../services/authService"

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "")

interface FetchOptions extends RequestInit {
  headers?: HeadersInit
}

/**
 * Fetch wrapper that automatically includes the JWT token in the Authorization header
 */
export async function fetchWithAuth(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const token = authService.getToken()

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  // Merge existing headers
  if (options.headers) {
    const existingHeaders = new Headers(options.headers)
    existingHeaders.forEach((value, key) => {
      headers[key] = value
    })
  }

  // Add Authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers,
  })

  // If unauthorized, remove token and redirect to login
  if (response.status === 401) {
    authService.removeToken()
    // Optional: redirect to login page
    // window.location.href = '/login'
  }

  return response
}
