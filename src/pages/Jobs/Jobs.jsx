import { useState } from 'react'
import { useJobs } from '../../context/JobContext'
import JobSearch from '../../components/JobSearch/JobSearch'
import JobCard from '../../components/JobCard/JobCard'
import './Jobs.css'

function Jobs() {
  const { jobs, deleteJob, updateJob } = useJobs()
  const [filteredJobs, setFilteredJobs] = useState(jobs)

  const handleSearch = (searchData) => {
    const { query, type, location } = searchData
    
    const results = jobs.filter(job => {
      const matchesQuery = job.title.toLowerCase().includes(query.toLowerCase()) || 
                          job.company.toLowerCase().includes(query.toLowerCase())
      const matchesType = type === 'All' || job.type === type
      const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase())
      
      return matchesQuery && matchesType && matchesLocation
    })
    
    setFilteredJobs(results)
  }

  return (
    <div className="jobs-page">
      <div className="jobs-page__hero">
        <h1 className="jobs-page__title">Explore Career Opportunities</h1>
        <p className="jobs-page__subtitle">Find your next step in tech</p>
        <JobSearch onSearch={handleSearch} />
      </div>
      
      <div className="jobs-page__container">
        <div className="jobs-page__count">
          Showing {filteredJobs.length} jobs
        </div>
        
        <div className="jobs-page__list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onDelete={deleteJob} 
                onUpdate={updateJob} 
              />
            ))
          ) : (
            <div className="jobs-page__empty">
              <i className="fa-solid fa-search-minus"></i>
              <h3>No jobs found</h3>
              <p>Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs
