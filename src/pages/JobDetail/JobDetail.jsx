import { useParams, Link, useNavigate } from 'react-router-dom'
import { useJobs } from '../../context/JobContext'
import './JobDetail.css'

function JobDetail() {
  const { id } = useParams()
  const { getJob, deleteJob, isBookmarked, toggleBookmark } = useJobs()
  const navigate = useNavigate()
  const job = getJob(id)

  if (!job) {
    return (
      <div className="job-detail-error">
        <h2>Job not found</h2>
        <p>The position you are looking for does not exist or has been removed.</p>
        <Link to="/jobs" className="btn-back">Back to Jobs</Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this posting?')) {
      deleteJob(job.id)
      navigate('/jobs')
    }
  }

  return (
    <div className="job-detail-page">
      <div className="job-detail-page__header">
        <Link to="/jobs" className="btn-back">
          <i className="fa-solid fa-arrow-left"></i> Back to All Jobs
        </Link>
      </div>

      <div className="job-detail-container">
        <div className="job-detail-card">
          <div className="job-detail-card__header">
            <div className="job-detail-card__main">
              <div className="job-detail-card__logo">
                <i className="fa-solid fa-building"></i>
              </div>
              <div>
                <h1 className="job-detail-card__title">{job.title}</h1>
                <p className="job-detail-card__company">{job.company}</p>
              </div>
            </div>
            <div className="job-detail-card__actions">
              <button 
                className={`btn-bookmark ${isBookmarked(job.id) ? 'btn-bookmark--active' : ''}`}
                onClick={() => toggleBookmark(job.id)}
              >
                <i className={`${isBookmarked(job.id) ? 'fa-solid' : 'fa-regular'} fa-bookmark`}></i>
              </button>
              <button className="btn-apply shadow-btn">Apply Now</button>
            </div>
          </div>

          <div className="job-detail-grid">
            <div className="job-detail-grid__item">
              <span className="label">Location</span>
              <span className="value"><i className="fa-solid fa-location-dot"></i> {job.location}</span>
            </div>
            <div className="job-detail-grid__item">
              <span className="label">Job Type</span>
              <span className="value"><i className="fa-solid fa-briefcase"></i> {job.type}</span>
            </div>
            <div className="job-detail-grid__item">
              <span className="label">Salary</span>
              <span className="value"><i className="fa-solid fa-indian-rupee-sign"></i> {job.salary || 'Competitive'}</span>
            </div>
            <div className="job-detail-grid__item">
              <span className="label">Experience</span>
              <span className="value"><i className="fa-solid fa-clock"></i> {job.experience || 'Not specified'}</span>
            </div>
          </div>

          <div className="job-detail-content">
            <div className="job-detail-section">
              <h2>About the Role</h2>
              <p>{job.description}</p>
            </div>
            
            <div className="job-detail-section">
              <h2>Key Responsibilities</h2>
              <ul>
                <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
                <li>Write production-ready, high-quality code following best practices.</li>
                <li>Continuously discover, evaluate, and implement new technologies to maximize development efficiency.</li>
                <li>Collaborate with designers to ensure high-quality UI/UX.</li>
              </ul>
            </div>
          </div>

          <div className="job-detail-footer">
            <span className="posted-date">Posted on {new Date(job.postedAt).toLocaleDateString()}</span>
            <button className="btn-delete" onClick={handleDelete}>
              <i className="fa-solid fa-trash"></i> Delete Posting
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
