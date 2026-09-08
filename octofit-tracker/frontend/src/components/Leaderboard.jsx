import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Rank', render: (entry) => entry.rank ?? '-' },
  { label: 'Student', render: (entry) => entry.user?.name ?? entry.name ?? entry.user ?? 'Unknown' },
  { label: 'Team', render: (entry) => entry.team?.name ?? entry.team ?? 'Independent' },
  { label: 'Points', render: (entry) => entry.points ?? entry.score ?? 0 },
]

function Leaderboard() {
  return <ResourceTable title="Leaderboard" resource="leaderboard" columns={columns} emptyMessage="The leaderboard is waiting for its first score." />
}

export default Leaderboard