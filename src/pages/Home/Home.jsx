import Hero from '../../components/Hero/Hero'
import StatsBar from '../../components/StatsBar/StatsBar'
import FeaturedJobs from '../../components/FeaturedJobs/FeaturedJobs'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <StatsBar />
      <FeaturedJobs />
    </div>
  )
}

export default Home
