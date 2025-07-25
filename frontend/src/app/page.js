import Header from '../components/layout/Header'
import TasteLagosFooter from '../components/layout/TasteLagosFooter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      {/* Temporary content - we'll replace this with hero section next */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          TasteLagos Homepage
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          ✅ Header implemented with mobile responsiveness<br/>
          ✅ Footer implemented with mobile responsiveness<br/>
          🔄 Next: Hero section with background image
        </p>
        
        {/* Spacer for demo purposes */}
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          Hero Section Coming Next
        </div>
      </div>
      
      <TasteLagosFooter />
    </div>
  )
}