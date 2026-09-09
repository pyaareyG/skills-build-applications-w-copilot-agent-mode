# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker application. It uses Vite, React Router, and Bootstrap.

## Environment

When running in GitHub Codespaces, `VITE_CODESPACE_NAME` must be defined in `octofit-tracker/frontend/.env.local` (see `.env.example`):

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes client-side variables only when they use the `VITE_` prefix. With this variable set, API requests use `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`.

If `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to `http://localhost:8000/api/[component]/` for local development.

## Development

From the repository root, run:

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
