import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Workout', render: (workout) => workout.name ?? workout.title ?? workout.type ?? 'Workout' },
  { label: 'Difficulty', render: (workout) => workout.difficulty ?? workout.level ?? 'All levels' },
  { label: 'Duration', render: (workout) => `${workout.durationMinutes ?? workout.duration ?? 0} min` },
  { label: 'Focus', render: (workout) => workout.focus ?? workout.description ?? 'General fitness' },
]

function Workouts() {
  return <ResourceTable title="Workouts" resource="workouts" columns={columns} emptyMessage="No workout suggestions are available yet." />
}

export default Workouts