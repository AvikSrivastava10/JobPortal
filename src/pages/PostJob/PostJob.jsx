import { useNavigate } from 'react-router-dom'
import { useJobs } from '../../context/JobContext'
import JobForm from '../../components/JobForm/JobForm'
import './PostJob.css'

function PostJob() {
  const { addJob } = useJobs()
  const navigate = useNavigate()

  const handlePost = (jobData) => {
    addJob(jobData)
    // In a real app, we'd show a success toast here
    navigate('/jobs')
  }

  return (
    <div className="post-job-page">
      <div className="post-job-page__header">
        <h1>Create a Job Opportunity</h1>
        <p>Reach thousands of potential candidates by posting your job here.</p>
      </div>
      
      <div className="post-job-page__container">
        <JobForm onSubmit={handlePost} />
      </div>
    </div>
  )
}

export default PostJob
