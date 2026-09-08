import { useEffect, useState } from 'react'
import { apiUrl, getResults } from '../api.js'

function ResourceTable({ columns, emptyMessage, resource, title }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setStatus('loading')
      setError('')

      try {
        const response = await fetch(apiUrl(resource), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setItems(getResults(payload))
        setStatus('success')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadItems()
    return () => controller.abort()
  }, [resource])

  return (
    <section aria-labelledby={`${resource}-heading`}>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OctoFit records</p>
          <h1 id={`${resource}-heading`}>{title}</h1>
        </div>
        {status === 'success' && (
          <span className="record-count">{items.length} records</span>
        )}
      </div>

      {status === 'loading' && (
        <div className="state-panel" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          Loading {title.toLowerCase()}...
        </div>
      )}

      {status === 'error' && (
        <div className="alert alert-danger" role="alert">
          <strong>Unable to load {title.toLowerCase()}.</strong> {error}
        </div>
      )}

      {status === 'success' && items.length === 0 && (
        <div className="state-panel">{emptyMessage}</div>
      )}

      {status === 'success' && items.length > 0 && (
        <div className="table-responsive data-table-wrap">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th scope="col" key={column.label}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? `${resource}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.label}>{column.render(item)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourceTable