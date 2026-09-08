import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Student', render: (activity) => activity.user?.name ?? activity.user ?? 'Unknown' },
  { label: 'Activity', render: (activity) => activity.type ?? activity.name ?? 'Activity' },
  { label: 'Duration', render: (activity) => `${activity.durationMinutes ?? activity.duration ?? 0} min` },
  { label: 'Date', render: (activity) => activity.date ? new Date(activity.date).toLocaleDateString() : 'Not recorded' },
]

function Activities() {
  return (
    <ResourceTable
      title="Activities"
      resource="activities"
      columns={columns}
      emptyMessage="No activities have been logged yet."
    />
  )
}

export default Activities