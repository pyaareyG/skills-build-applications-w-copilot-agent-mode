const codespaceName = process.env.CODESPACE_NAME;

// Prefer the Codespaces forwarded URL when running in a Codespace, otherwise fall back to localhost
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
