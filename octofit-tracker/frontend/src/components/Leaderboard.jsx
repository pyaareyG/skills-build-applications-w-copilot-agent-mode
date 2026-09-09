import ResourceTable from './ResourceTable.jsx'

export default function Leaderboard() {
  return (
    <ResourceTable
      resource="leaderboard"
      title="Leaderboard"
      emptyMessage="No leaderboard entries found."
    />
  )
}