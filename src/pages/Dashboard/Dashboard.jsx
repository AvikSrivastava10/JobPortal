import { useJobs } from '../../context/JobContext'
import './Dashboard.css'

function Dashboard() {
  const { stats, jobs } = useJobs()

  const metrics = [
    { label: 'Total Listings', value: stats.totalJobs, icon: 'fa-briefcase', color: '#6c63ff' },
    { label: 'Companies', value: stats.companies, icon: 'fa-building', color: '#00d2ff' },
    { label: 'Remote Jobs', value: stats.remoteJobs, icon: 'fa-globe', color: '#3b82f6' },
    { label: 'New Today', value: stats.recentJobs, icon: 'fa-bolt', color: '#ff6b9d' },
  ]

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <h1>Admin Dashboard</h1>
        <p>Monitor your job portal performance and statistics.</p>
      </div>
      
      <div className="dashboard-page__container">
        <div className="dashboard-page__grid">
          {metrics.map((m, i) => (
            <div key={i} className="dashboard-card">
              <div className="dashboard-card__icon" style={{ backgroundColor: `${m.color}20`, color: m.color }}>
                <i className={`fa-solid ${m.icon}`}></i>
              </div>
              <div className="dashboard-card__content">
                <span className="dashboard-card__value">{m.value}</span>
                <span className="dashboard-card__label">{m.label}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="dashboard-page__section">
          <h2>Recent Activity</h2>
          <div className="dashboard-recent">
            {jobs.slice(0, 5).map(job => (
              <div key={job.id} className="dashboard-recent__item">
                <div className="dashboard-recent__info">
                  <span className="dashboard-recent__title">{job.title}</span>
                  <span className="dashboard-recent__meta">{job.company} • {job.location}</span>
                </div>
                <div className="dashboard-recent__status">
                  <span className="status-badge status-badge--active">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
