import { createContext, useContext, useState, useEffect } from 'react'

const JobContext = createContext()

// Seed data so pages aren't empty on first load
const SEED_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechNova Inc.',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹18L – ₹28L per annum',
    experience: '3–5 Years',
    description:
      'We are looking for a Senior Frontend Developer proficient in React, TypeScript, and modern CSS. You will lead UI architecture decisions, mentor junior devs, and work closely with design and product teams to ship pixel-perfect interfaces.',
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    tags: ['React', 'TypeScript', 'CSS'],
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'CloudSync Labs',
    location: 'Hyderabad, India',
    type: 'Full-time',
    salary: '₹14L – ₹22L per annum',
    experience: '2–4 Years',
    description:
      'Join our backend team building scalable microservices with Node.js and Go. You will design APIs, optimize database queries, and ensure 99.99% uptime for our cloud platform serving millions of users.',
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    tags: ['Node.js', 'Go', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'DesignCraft Studio',
    location: 'Remote',
    type: 'Remote',
    salary: '₹10L – ₹16L per annum',
    experience: '1–3 Years',
    description:
      'Create beautiful, intuitive interfaces for web and mobile applications. You will conduct user research, build wireframes and prototypes in Figma, and collaborate with engineers to bring designs to life.',
    postedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    tags: ['Figma', 'UI Design', 'User Research'],
  },
  {
    id: 4,
    title: 'DevOps Intern',
    company: 'InfraStack',
    location: 'Pune, India',
    type: 'Internship',
    salary: '₹15K – ₹25K per month',
    experience: '0–1 Years',
    description:
      'Learn CI/CD pipelines, Docker, Kubernetes, and cloud infrastructure in a hands-on internship. Great opportunity for students passionate about automation and infrastructure engineering.',
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Docker', 'Kubernetes', 'AWS'],
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'AnalytiQ',
    location: 'Mumbai, India',
    type: 'Full-time',
    salary: '₹20L – ₹35L per annum',
    experience: '3–6 Years',
    description:
      'Apply machine learning and statistical modeling to solve complex business problems. You will work with large datasets, build predictive models, and present actionable insights to stakeholders.',
    postedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    tags: ['Python', 'ML', 'TensorFlow'],
  },
  {
    id: 6,
    title: 'Mobile App Developer',
    company: 'AppForge',
    location: 'Delhi NCR, India',
    type: 'Contract',
    salary: '₹12L – ₹20L per annum',
    experience: '2–4 Years',
    description:
      'Build cross-platform mobile applications using React Native. You will integrate REST APIs, implement smooth animations, handle offline storage, and publish to App Store and Google Play.',
    postedAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    tags: ['React Native', 'iOS', 'Android'],
  },
]

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobportal_jobs')
    return saved ? JSON.parse(saved) : SEED_JOBS
  })

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('jobportal_bookmarks')
    return saved ? JSON.parse(saved) : []
  })

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('jobportal_jobs', JSON.stringify(jobs))
  }, [jobs])

  useEffect(() => {
    localStorage.setItem('jobportal_bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now() + Math.random(),
      postedAt: new Date().toISOString(),
      tags: jobData.tags || [],
    }
    setJobs((prev) => [newJob, ...prev])
    return newJob
  }

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
    setBookmarks((prev) => prev.filter((bId) => bId !== id))
  }

  const updateJob = (id, updatedData) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updatedData } : job))
    )
  }

  const getJob = (id) => jobs.find((job) => job.id === Number(id))

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    )
  }

  const isBookmarked = (id) => bookmarks.includes(id)

  const stats = {
    totalJobs: jobs.length,
    companies: [...new Set(jobs.map((j) => j.company))].length,
    remoteJobs: jobs.filter((j) => j.type === 'Remote' || j.location.toLowerCase().includes('remote')).length,
    recentJobs: jobs.filter((j) => Date.now() - new Date(j.postedAt).getTime() < 24 * 60 * 60 * 1000).length,
  }

  return (
    <JobContext.Provider
      value={{
        jobs,
        bookmarks,
        stats,
        addJob,
        deleteJob,
        updateJob,
        getJob,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export function useJobs() {
  const context = useContext(JobContext)
  if (!context) throw new Error('useJobs must be used within a JobProvider')
  return context
}
