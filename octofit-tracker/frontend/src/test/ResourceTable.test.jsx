import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ResourceTable from '../components/ResourceTable.jsx'

function mockFetchOnce(payload, { ok = true, status = 200 } = {}) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => payload,
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('ResourceTable', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CODESPACE_NAME', 'super-octofit')
  })

  it('requests the resource endpoint under the Codespaces API base URL', async () => {
    const fetchMock = mockFetchOnce([])

    render(<ResourceTable resource="teams" title="Teams" emptyMessage="No teams found." />)

    await waitFor(() => expect(fetchMock).toHaveBeenCalled())
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://super-octofit-8000.app.github.dev/api/teams/',
    )
  })

  it('renders rows from an array response using explicit columns', async () => {
    mockFetchOnce([{ _id: '1', name: 'Blue Team', points: 42 }])

    render(
      <ResourceTable
        resource="teams"
        title="Teams"
        emptyMessage="No teams found."
        columns={[
          { label: 'Name', render: (item) => item.name },
          { label: 'Points', render: (item) => item.points },
        ]}
      />,
    )

    expect(await screen.findByText('Blue Team')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByText('1 records')).toBeInTheDocument()
  })

  it('renders rows from a paginated response and derives columns', async () => {
    mockFetchOnce({ count: 1, results: [{ _id: '1', name: 'Blue Team' }] })

    render(<ResourceTable resource="teams" title="Teams" emptyMessage="No teams found." />)

    expect(await screen.findByText('Blue Team')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'name' })).toBeInTheDocument()
  })

  it('shows the empty message when there are no records', async () => {
    mockFetchOnce([])

    render(<ResourceTable resource="teams" title="Teams" emptyMessage="No teams found." />)

    expect(await screen.findByText('No teams found.')).toBeInTheDocument()
  })

  it('shows an alert when the request fails', async () => {
    mockFetchOnce(null, { ok: false, status: 500 })

    render(<ResourceTable resource="teams" title="Teams" emptyMessage="No teams found." />)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Request failed with status 500')
  })
})
