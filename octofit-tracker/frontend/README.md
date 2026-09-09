# Octofit Tracker frontend

This React 19 + Vite app is the presentation tier for Octofit Tracker.

## Environment

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when you want the app to call the Codespaces-hosted backend.

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000`.
