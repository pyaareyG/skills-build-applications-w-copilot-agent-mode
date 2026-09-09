import ResourcePage from './ResourcePage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

const columns = [
  { key: 'type', label: 'Type' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'date', label: 'Date' },
  { key: 'user', label: 'User' },
];

function Activities() {
  return (
    <ResourcePage
      title="Activities"
      description="Track logged workouts and movement across Octofit members."
      endpoint={endpoint}
      columns={columns}
    />
  );
}

export default Activities;
