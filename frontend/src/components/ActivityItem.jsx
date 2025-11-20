import { formatDate } from '../utils/formatDate'
import './ActivityItem.css'

const ActivityItem = ({ activity }) => {
  const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'danger'
  }

  const statusColors = {
    pending: 'warning',
    'in-progress': 'primary',
    completed: 'success'
  }

  return (
    <div className="activity-item">
      <div className="activity-header">
        <h3 className="activity-title">{activity.title}</h3>
        <div className="activity-badges">
          <span className={`badge badge-${priorityColors[activity.priority]}`}>
            {activity.priority}
          </span>
          <span className={`badge badge-${statusColors[activity.status]}`}>
            {activity.status}
          </span>
        </div>
      </div>
      
      <p className="activity-description">{activity.description}</p>
      
      <div className="activity-meta">
        <div className="meta-item">
          <span className="meta-label">Category:</span>
          <span className="meta-value">{activity.category}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Duration:</span>
          <span className="meta-value">{activity.duration} hours</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Date:</span>
          <span className="meta-value">{formatDate(activity.date)}</span>
        </div>
      </div>

      {activity.user && (
        <div className="activity-user">
          <span className="user-badge">{activity.user.name}</span>
        </div>
      )}
    </div>
  )
}

export default ActivityItem