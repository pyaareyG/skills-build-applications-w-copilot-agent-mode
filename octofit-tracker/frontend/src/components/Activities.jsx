
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'User', render: (item) => item.user },
  { label: 'Type', render: (item) => item.type },
  { label: 'Duration (min)', render: (item) => item.durationMinutes },
  { label: 'Date', render: (item) => (item.date ? new Date(item.date).toLocaleDateString() : '') },
]

export default function Activities() {
  return (
    <ResourceTable
      resource="activities"
      title="Activities"
      columns={columns}
      emptyMessage="No activities found."
    />
  )
}