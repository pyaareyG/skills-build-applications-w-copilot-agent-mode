import ResourcePage from './ResourcePage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Members' },
  { key: 'description', label: 'Description' },
];

function Teams() {
  return (
    <ResourcePage
      title="Teams"
      description="View teams, rosters, and collaboration groups for competitions."
      endpoint={endpoint}
      columns={columns}
    />
  );
}

export default Teams;
