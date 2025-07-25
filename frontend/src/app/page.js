import Header from '../components/layout/Header'
import TasteLagosHero from '../components/layout/TasteLagosHero'
import FeaturedRestaurants from '../components/restaurant/FeaturedRestaurants'
import NearbyRestaurants from '../components/restaurant/NearbyRestaurants'
import TasteLagosFooter from '../components/layout/TasteLagosFooter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <TasteLagosHero />
      <FeaturedRestaurants />
      <NearbyRestaurants />
      <TasteLagosFooter />
    </div>
  )
}