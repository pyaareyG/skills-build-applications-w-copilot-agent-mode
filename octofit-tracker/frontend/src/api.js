// VITE_CODESPACE_NAME must be defined (e.g. in octofit-tracker/frontend/.env.local) when running in Codespaces.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export function getApiBaseUrl() {
  // Fallback avoids building a broken "https://undefined-8000..." URL when the env var is unset.
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
}

export const apiBaseUrl = getApiBaseUrl()

export function apiUrl(resource) {
  return `${getApiBaseUrl()}/${resource}/`
}

export function getResults(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return Array.isArray(payload?.results) ? payload.results : []
}