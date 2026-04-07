import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h2 className="hero__title">
          Post & Manage Jobs Effortlessly
        </h2>
        <p className="hero__subtitle">
          Create job listings, manage postings, and find the perfect candidates — all in one place.
        </p>
        <a href="#post-job" className="hero__cta shimmer-btn">
          Post a Job <i className="fa-solid fa-arrow-right hero__cta-arrow"></i>
        </a>
      </div>
    </section>
  )
}

export default Hero
