import { useState } from 'react'
import './JobSearch.css'

function JobSearch({ onSearch }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [location, setLocation] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch({ query, type, location })
  }

  return (
    <form className="job-search" onSubmit={handleSearch}>
      <div className="job-search__group">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input 
          type="text" 
          placeholder="Job title or company" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      <div className="job-search__group">
        <i className="fa-solid fa-location-dot"></i>
        <input 
          type="text" 
          placeholder="Location" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      <div className="job-search__group">
        <i className="fa-solid fa-briefcase"></i>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>
      </div>
      
      <button type="submit" className="job-search__button">
        Find Jobs
      </button>
    </form>
  )
}

export default JobSearch
