import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App.jsx'

function renderApp(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routing', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CODESPACE_NAME', 'super-octofit')
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => [] }),
    )
  })

  it('redirects the index route to activities', async () => {
    renderApp('/')

    expect(await screen.findByRole('heading', { name: 'Activities' })).toBeInTheDocument()
  })

  it('redirects unknown routes to activities', async () => {
    renderApp('/does-not-exist')

    expect(await screen.findByRole('heading', { name: 'Activities' })).toBeInTheDocument()
  })

  it.each([
    ['Leaderboard', '/leaderboard'],
    ['Teams', '/teams'],
    ['Users', '/users'],
    ['Workouts', '/workouts'],
  ])('renders the %s route', async (name, path) => {
    renderApp(path)

    expect(await screen.findByRole('heading', { name })).toBeInTheDocument()
  })

  it('navigates between views with the nav links', async () => {
    const user = userEvent.setup()
    renderApp('/activities')

    await user.click(screen.getByRole('link', { name: 'Users' }))

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument(),
    )
  })

  it('marks the current route link as active', async () => {
    renderApp('/teams')

    await waitFor(() =>
      expect(screen.getByRole('link', { name: 'Teams' })).toHaveClass('active'),
    )
  })
})
