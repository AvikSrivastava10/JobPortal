import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo-link">
        <h1 className="navbar__logo">
          <i className="fa-solid fa-briefcase"></i> JobPortal
        </h1>
      </Link>
      <nav className="navbar__nav">
        <Link to="/" className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}>Home</Link>
        <Link to="/jobs" className={`navbar__link ${isActive('/jobs') ? 'navbar__link--active' : ''}`}>Jobs</Link>
        <Link to="/post-job" className={`navbar__link ${isActive('/post-job') ? 'navbar__link--active' : ''}`}>Post Job</Link>
        <Link to="/dashboard" className={`navbar__link ${isActive('/dashboard') ? 'navbar__link--active' : ''}`}>Dashboard</Link>
        <Link to="#" className="navbar__link navbar__link--cta">Register</Link>
      </nav>
    </header>
  )
}

export default Navbar
