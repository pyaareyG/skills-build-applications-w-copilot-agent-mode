import { useEffect, useState } from 'react';

function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const collectionKeys = ['results', 'items', 'data', 'docs'];

    for (const key of collectionKeys) {
      if (Array.isArray(payload[key])) {
        return payload[key];
      }
    }
  }

  return [];
}

function formatValue(value) {
  if (value == null || value === '') {
    return '—';
  }

  if (Array.isArray(value)) {
    return value.join(', ') || '—';
  }

  if (typeof value === 'object') {
    if ('name' in value && typeof value.name === 'string') {
      return value.name;
    }

    if ('_id' in value && typeof value._id === 'string') {
      return value._id;
    }

    return JSON.stringify(value);
  }

  return String(value);
}

function ResourcePage({ title, description, endpoint, columns }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecords() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(endpoint, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setRecords(normalizeResponse(payload));
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load data.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadRecords();

    return () => controller.abort();
  }, [endpoint]);

  return (
    <section>
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <h2 className="h4 mb-1">{title}</h2>
          <p className="text-muted mb-0">{description}</p>
        </div>
        <div className="endpoint-badge align-self-lg-start">
          <span className="text-muted small d-block">API endpoint</span>
          <code>{endpoint}</code>
        </div>
      </div>

      {loading ? <div className="alert alert-secondary mb-0">Loading {title.toLowerCase()}…</div> : null}

      {!loading && error ? (
        <div className="alert alert-warning mb-0">
          Unable to load {title.toLowerCase()}: {error}
        </div>
      ) : null}

      {!loading && !error && records.length === 0 ? (
        <div className="alert alert-light border mb-0">No {title.toLowerCase()} available yet.</div>
      ) : null}

      {!loading && !error && records.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id || record.id || `${title}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>{formatValue(record[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default ResourcePage;
