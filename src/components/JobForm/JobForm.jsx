import { useState } from 'react'
import './JobForm.css'

const initialFormData = {
  title: '',
  company: '',
  location: '',
  type: 'Full-time',
  salary: '',
  experience: '',
  description: '',
}

function JobForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData(initialFormData)
  }

  return (
    <section id="post-job" className="job-form-section">
      <h2 className="job-form-section__title">
        <i className="fa-solid fa-plus-circle gradient-text"></i> Create a Job Posting
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="job-form__grid">
          <div className="job-form__field">
            <label htmlFor="jobTitle" className="job-form__label">
              Job Title <span className="job-form__required">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              name="title"
              placeholder="e.g. Frontend Developer"
              required
              value={formData.title}
              onChange={handleChange}
              className="job-form__input"
            />
          </div>
          <div className="job-form__field">
            <label htmlFor="companyName" className="job-form__label">
              Company Name <span className="job-form__required">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="company"
              placeholder="e.g. TechNova Inc."
              required
              value={formData.company}
              onChange={handleChange}
              className="job-form__input"
            />
          </div>
          <div className="job-form__field">
            <label htmlFor="location" className="job-form__label">
              Location <span className="job-form__required">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g. Bangalore, Remote"
              required
              value={formData.location}
              onChange={handleChange}
              className="job-form__input"
            />
          </div>
          <div className="job-form__field">
            <label htmlFor="jobType" className="job-form__label">Job Type</label>
            <select
              id="jobType"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="job-form__input job-form__select"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div className="job-form__field">
            <label htmlFor="salary" className="job-form__label">Salary Range</label>
            <input
              type="text"
              id="salary"
              name="salary"
              placeholder="e.g. ₹6L – ₹12L per annum"
              value={formData.salary}
              onChange={handleChange}
              className="job-form__input"
            />
          </div>
          <div className="job-form__field">
            <label htmlFor="experience" className="job-form__label">Experience</label>
            <input
              type="text"
              id="experience"
              name="experience"
              placeholder="e.g. 1–3 Years"
              value={formData.experience}
              onChange={handleChange}
              className="job-form__input"
            />
          </div>
        </div>
        <div className="job-form__field job-form__field--full">
          <label htmlFor="description" className="job-form__label">
            Job Description <span className="job-form__required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Describe the role, responsibilities, and requirements..."
            required
            value={formData.description}
            onChange={handleChange}
            className="job-form__input job-form__textarea"
          />
        </div>
        <button type="submit" className="job-form__submit shimmer-btn">
          <i className="fa-solid fa-paper-plane"></i> Post Job
        </button>
      </form>
    </section>
  )
}

export default JobForm
