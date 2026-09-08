import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Team', render: (team) => team.name ?? 'Unnamed team' },
  { label: 'Coach', render: (team) => team.coach?.name ?? team.coach ?? 'Not assigned' },
  { label: 'Members', render: (team) => Array.isArray(team.members) ? team.members.length : team.memberCount ?? 0 },
  { label: 'Points', render: (team) => team.points ?? team.score ?? 0 },
]

function Teams() {
  return <ResourceTable title="Teams" resource="teams" columns={columns} emptyMessage="No teams have been created yet." />
}

export default Teams