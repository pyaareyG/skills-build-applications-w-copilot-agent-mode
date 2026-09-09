import ResourcePage from './ResourcePage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'focusArea', label: 'Focus Area' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'difficulty', label: 'Difficulty' },
];

function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      description="Explore recommended workouts personalized for fitness goals."
      endpoint={endpoint}
      columns={columns}
    />
  );
}

export default Workouts;
