import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Name', render: (user) => user.name ?? 'Unnamed student' },
  { label: 'Email', render: (user) => user.email ?? 'Not provided' },
  { label: 'Team', render: (user) => user.team?.name ?? user.team ?? 'Independent' },
]

function Users() {
  return <ResourceTable title="Users" resource="users" columns={columns} emptyMessage="No users have joined OctoFit yet." />
}

export default Users