import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './JobCard.css'

function JobCard({ job, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [editData, setEditData] = useState({ ...job })
  const cardRef = useRef(null)

  const handleDelete = (e) => {
    e.stopPropagation()
    setIsRemoving(true)
    setTimeout(() => {
      onDelete(job.id)
    }, 450)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    setEditData({ ...job })
    setIsEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onUpdate(job.id, {
      title: editData.title.trim() || job.title,
      company: editData.company.trim() || job.company,
      location: editData.location.trim() || job.location,
      type: editData.type,
      salary: editData.salary.trim(),
      experience: editData.experience.trim(),
      description: editData.description.trim() || job.description,
    })
    setIsEditing(false)
  }

  const handleCancel = (e) => {
    e.stopPropagation()
    setIsEditing(false)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const cardClass = [
    'job-card',
    isEditing ? 'job-card--editing' : '',
    isRemoving ? 'job-card--removing' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (isEditing) {
    return (
      <div className={cardClass} ref={cardRef}>
        <div className="job-card__edit-field">
          <label className="job-card__edit-label">Job Title</label>
          <input
            type="text"
            name="title"
            className="job-card__edit-input"
            value={editData.title}
            onChange={handleEditChange}
            required
          />
        </div>
        <div className="job-card__edit-field">
          <label className="job-card__edit-label">Company Name</label>
          <input
            type="text"
            name="company"
            className="job-card__edit-input"
            value={editData.company}
            onChange={handleEditChange}
            required
          />
        </div>
        <div className="job-card__edit-field">
          <label className="job-card__edit-label">Location</label>
          <input
            type="text"
            name="location"
            className="job-card__edit-input"
            value={editData.location}
            onChange={handleEditChange}
            required
          />
        </div>
        <div className="job-card__edit-field">
          <label className="job-card__edit-label">Job Type</label>
          <select
            name="type"
            className="job-card__edit-input job-card__edit-select"
            value={editData.type}
            onChange={handleEditChange}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="job-card__edit-field">
          <label className="job-card__edit-label">Salary Range</label>
          <input
            type="text"
            name="salary"
            className="job-card__edit-input"
            value={editData.salary}
            onChange={handleEditChange}
          />
        </div>
        <div className="job-card__edit-field">
          <label className="job-card__edit-label">Experience</label>
          <input
            type="text"
            name="experience"
            className="job-card__edit-input"
            value={editData.experience}
            onChange={handleEditChange}
          />
        </div>
        <div className="job-card__edit-field">
          <label className="job-card__edit-label">Description</label>
          <textarea
            name="description"
            className="job-card__edit-input job-card__edit-textarea"
            rows="3"
            value={editData.description}
            onChange={handleEditChange}
          />
        </div>
        <div className="job-card__actions">
          <button type="button" className="job-card__btn job-card__btn--save" onClick={handleSave}>
            <i className="fa-solid fa-check"></i> Save
          </button>
          <button type="button" className="job-card__btn job-card__btn--cancel" onClick={handleCancel}>
            <i className="fa-solid fa-xmark"></i> Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={cardClass} ref={cardRef}>
      <div className="job-card__header">
        <h3 className="job-card__title">
           <Link to={`/job/${job.id}`}>{job.title}</Link>
        </h3>
        <span className="job-card__badge">{job.type}</span>
      </div>
      <div className="job-card__meta">
        <span className="job-card__meta-item">
          <i className="fa-solid fa-building gradient-text"></i> {job.company}
        </span>
        <span className="job-card__meta-item">
          <i className="fa-solid fa-location-dot gradient-text"></i> {job.location}
        </span>
        {job.salary && (
          <span className="job-card__meta-item">
            <i className="fa-solid fa-indian-rupee-sign gradient-text"></i> {job.salary}
          </span>
        )}
        {job.experience && (
          <span className="job-card__meta-item">
            <i className="fa-solid fa-clock gradient-text"></i> {job.experience}
          </span>
        )}
      </div>
      <div className="job-card__description">{job.description.length > 150 ? job.description.substring(0, 150) + '...' : job.description}</div>
      <div className="job-card__actions">
        <button type="button" className="job-card__btn job-card__btn--edit" onClick={handleEdit}>
          <i className="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button type="button" className="job-card__btn job-card__btn--delete" onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"></i> Delete
        </button>
      </div>
    </div>
  )
}

export default JobCard
