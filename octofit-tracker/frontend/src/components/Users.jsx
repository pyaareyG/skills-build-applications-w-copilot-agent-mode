import ResourcePage from './ResourcePage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
];

function Users() {
  return (
    <ResourcePage
      title="Users"
      description="See athlete profiles, contact details, and team assignments."
      endpoint={endpoint}
      columns={columns}
    />
  );
}

export default Users;
