import Header from '../components/layout/Header'
import TasteLagosHero from '../components/layout/TasteLagosHero'
import FeaturedRestaurants from '../components/restaurant/FeaturedRestaurants'
import NearbyRestaurants from '../components/restaurant/NearbyRestaurants'
import MeetCommunity from '../components/community/MeetCommunity'
import CitySection from '../components/city/CitySection'
import NewsletterSection from '../components/newsletter/NewsletterSection'
import TasteLagosFooter from '../components/layout/TasteLagosFooter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <TasteLagosHero />
      <FeaturedRestaurants />
      <NearbyRestaurants />
      <MeetCommunity />
      <CitySection />
      <NewsletterSection />
      <TasteLagosFooter />
    </div>
  )
}