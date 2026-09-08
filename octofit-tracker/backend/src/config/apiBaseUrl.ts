export const port = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const portForwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev';

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.${portForwardingDomain}`
  : `http://localhost:${port}`;
