import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './AnalyticsCharts.css'

const AnalyticsCharts = ({ analytics }) => {
  if (!analytics || !analytics.dailyActivities) {
    return <div className="charts-empty">No analytics data available</div>
  }

  const dailyData = analytics.dailyActivities.map(day => ({
    day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    activities: day.count,
    hours: day.totalDuration
  }))

  const categoryData = analytics.categoryBreakdown?.map(cat => ({
    category: cat._id,
    count: cat.count,
    hours: cat.totalDuration
  })) || []

  const priorityData = analytics.priorityBreakdown?.map(pri => ({
    priority: pri._id,
    count: pri.count
  })) || []

  const statusData = analytics.statusBreakdown?.map(stat => ({
    status: stat._id,
    count: stat.count
  })) || []

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-value" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="analytics-charts">
      <div className="chart-section">
        <h3 className="chart-title">Daily Activities This Week</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="activities" fill="#6366f1" name="Activities" radius={[8, 8, 0, 0]} />
              <Bar dataKey="hours" fill="#10b981" name="Hours" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">Activity Trend</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="activities" 
                stroke="#6366f1" 
                strokeWidth={3}
                name="Activities"
                dot={{ fill: '#6366f1', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Hours"
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {categoryData.length > 0 && (
        <div className="chart-section">
          <h3 className="chart-title">Category Breakdown</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={categoryData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="category" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Radar 
                  name="Activities" 
                  dataKey="count" 
                  stroke="#6366f1" 
                  fill="#6366f1" 
                  fillOpacity={0.6} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="chart-grid">
        {priorityData.length > 0 && (
          <div className="chart-section">
            <h3 className="chart-title">Priority Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={priorityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="priority" type="category" stroke="#94a3b8" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#f59e0b" name="Count" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {statusData.length > 0 && (
          <div className="chart-section">
            <h3 className="chart-title">Status Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={statusData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="status" type="category" stroke="#94a3b8" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#10b981" name="Count" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyticsCharts