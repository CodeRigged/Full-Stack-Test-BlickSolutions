const API_BASE_URL = "http://localhost:5000"

export function apiFetch(path: string, options?: RequestInit) {
  return fetch(`${API_BASE_URL}${path}`, options)
}
