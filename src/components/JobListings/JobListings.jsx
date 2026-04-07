import JobCard from '../JobCard/JobCard'
import './JobListings.css'

function JobListings({ jobs, onDelete, onUpdate }) {
  return (
    <section id="job-listings" className="job-listings">
      <h2 className="job-listings__title">
        <i className="fa-solid fa-list gradient-text"></i> Job Listings
      </h2>
      <p className="job-listings__subtitle">All posted jobs appear here</p>
      <div className="job-listings__container">
        {jobs.length === 0 ? (
          <div className="job-listings__empty">
            <i className="fa-solid fa-folder-open job-listings__empty-icon gradient-text"></i>
            <p>No jobs posted yet. Create your first job posting above!</p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} onDelete={onDelete} onUpdate={onUpdate} />
          ))
        )}
      </div>
    </section>
  )
}

export default JobListings
