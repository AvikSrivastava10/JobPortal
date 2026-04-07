import { useJobs } from '../../context/JobContext'
import JobCard from '../JobCard/JobCard'
import { Link } from 'react-router-dom'
import './FeaturedJobs.css'

function FeaturedJobs() {
  const { jobs, deleteJob, updateJob } = useJobs()
  
  // Just show the first 3 or latest 3 jobs
  const featured = jobs.slice(0, 3)

  return (
    <section className="featured-jobs">
      <div className="featured-jobs__header">
        <h2 className="featured-jobs__title">Featured Opportunities</h2>
        <Link to="/jobs" className="featured-jobs__view-all">
          View All <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
      <div className="featured-jobs__list">
        {featured.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onDelete={deleteJob} 
            onUpdate={updateJob} 
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedJobs
