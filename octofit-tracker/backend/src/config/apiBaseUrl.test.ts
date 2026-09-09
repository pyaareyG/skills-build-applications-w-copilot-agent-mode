import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalCodespaceName = process.env.CODESPACE_NAME;

async function loadConfig() {
  vi.resetModules();
  return import('./apiBaseUrl');
}

describe('apiBaseUrl', () => {
  beforeEach(() => {
    delete process.env.CODESPACE_NAME;
  });

  afterEach(() => {
    if (originalCodespaceName === undefined) {
      delete process.env.CODESPACE_NAME;
    } else {
      process.env.CODESPACE_NAME = originalCodespaceName;
    }
  });

  it('uses the Codespaces URL on port 8000 when CODESPACE_NAME is set', async () => {
    process.env.CODESPACE_NAME = 'super-octofit';

    const { apiBaseUrl } = await loadConfig();

    expect(apiBaseUrl).toBe('https://super-octofit-8000.app.github.dev');
  });

  it('falls back to localhost when CODESPACE_NAME is unset', async () => {
    const { apiBaseUrl, port } = await loadConfig();

    expect(port).toBe(8000);
    expect(apiBaseUrl).toBe('http://localhost:8000');
    expect(apiBaseUrl).not.toContain('undefined');
  });
});
