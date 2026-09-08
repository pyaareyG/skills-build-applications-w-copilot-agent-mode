const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function apiUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function getResults(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return Array.isArray(payload?.results) ? payload.results : []
}