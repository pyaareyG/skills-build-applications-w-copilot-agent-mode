import ResourcePage from './ResourcePage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'User' },
  { key: 'points', label: 'Points' },
  { key: 'streak', label: 'Streak' },
];

function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      description="Monitor standings, streaks, and points earned by participants."
      endpoint={endpoint}
      columns={columns}
    />
  );
}

export default Leaderboard;
