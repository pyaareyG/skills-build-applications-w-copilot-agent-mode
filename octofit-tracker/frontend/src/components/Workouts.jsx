import ResourceTable from './ResourceTable.jsx'

export default function Workouts() {
  return (
    <ResourceTable
      resource="workouts"
      title="Workouts"
      emptyMessage="No workouts found."
    />
  )
}