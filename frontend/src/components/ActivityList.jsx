import ActivityItem from './ActivityItem'
import './ActivityList.css'

const ActivityList = ({ activities, loading, error }) => {
  if (loading) {
    return (
      <div className="activity-list-loading">
        <div className="spinner"></div>
        <p>Loading activities...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="activity-list-error">
        <span className="error-icon">⚠️</span>
        <p>{error}</p>
      </div>
    )
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="activity-list-empty">
        <span className="empty-icon">📋</span>
        <h3>No Activities Found</h3>
        <p>Start by adding your first activity!</p>
      </div>
    )
  }

  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <ActivityItem key={activity._id} activity={activity} />
      ))}
    </div>
  )
}

export default ActivityList