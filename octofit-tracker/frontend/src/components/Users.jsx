import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Name', render: (item) => item.name },
  { label: 'Email', render: (item) => item.email },
  { label: 'Team', render: (item) => item.team ?? '—' },
]

export default function Users() {
  return (
    <ResourceTable
      resource="users"
      title="Users"
      columns={columns}
      emptyMessage="No users found."
    />
  )
}