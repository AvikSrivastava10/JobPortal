import { useJobs } from '../../context/JobContext'
import './StatsBar.css'

function StatsBar() {
  const { stats } = useJobs()

  return (
    <div className="stats-bar">
      <div className="stats-bar__container">
        <div className="stats-bar__item">
          <span className="stats-bar__number">{stats.totalJobs}</span>
          <span className="stats-bar__label">Jobs Posted</span>
        </div>
        <div className="stats-bar__item">
          <span className="stats-bar__number">{stats.companies}</span>
          <span className="stats-bar__label">Companies</span>
        </div>
        <div className="stats-bar__item">
          <span className="stats-bar__number">{stats.remoteJobs}</span>
          <span className="stats-bar__label">Remote Roles</span>
        </div>
        <div className="stats-bar__item">
          <span className="stats-bar__number">{stats.recentJobs}</span>
          <span className="stats-bar__label">New Today</span>
        </div>
      </div>
    </div>
  )
}

export default StatsBar
