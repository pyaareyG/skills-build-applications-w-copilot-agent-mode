import { describe, expect, it, vi } from 'vitest'
import { apiUrl, getApiBaseUrl, getResults } from '../api.js'

describe('getApiBaseUrl', () => {
  it('builds the Codespaces URL when VITE_CODESPACE_NAME is defined', () => {
    vi.stubEnv('VITE_CODESPACE_NAME', 'super-octofit')

    expect(getApiBaseUrl()).toBe('https://super-octofit-8000.app.github.dev/api')
  })

  it('falls back to localhost when VITE_CODESPACE_NAME is unset', () => {
    vi.stubEnv('VITE_CODESPACE_NAME', undefined)

    expect(getApiBaseUrl()).toBe('http://localhost:8000/api')
  })

  it('never produces an undefined host', () => {
    vi.stubEnv('VITE_CODESPACE_NAME', '')

    expect(getApiBaseUrl()).not.toContain('undefined')
  })
})

describe('apiUrl', () => {
  it('appends the resource with a trailing slash', () => {
    vi.stubEnv('VITE_CODESPACE_NAME', 'super-octofit')

    expect(apiUrl('activities')).toBe(
      'https://super-octofit-8000.app.github.dev/api/activities/',
    )
  })
})

describe('getResults', () => {
  it('returns a plain array response as-is', () => {
    expect(getResults([{ id: 1 }])).toEqual([{ id: 1 }])
  })

  it('unwraps a paginated response', () => {
    expect(getResults({ count: 1, results: [{ id: 1 }] })).toEqual([{ id: 1 }])
  })

  it('returns an empty array for unexpected payloads', () => {
    expect(getResults(null)).toEqual([])
    expect(getResults({ detail: 'not found' })).toEqual([])
  })
})
