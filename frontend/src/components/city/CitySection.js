'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const lagosAreas = [
  {
    id: 1,
    name: 'Victoria Island',
    slug: 'victoria-island',
    description: 'The business heart of Lagos with upscale dining and international cuisine',
    image: 'https://picsum.photos/400/300?random=1',
    restaurantCount: 486,
    averageRating: 4.2,
    priceRange: '₦₦₦-₦₦₦₦',
    highlights: ['Fine Dining', 'International Cuisine', 'Business District'],
    topCuisines: ['Continental', 'Lebanese', 'French', 'Nigerian'],
    featured: {
      restaurantName: 'Eric Kayser',
      restaurantRating: 4.5,
      specialty: 'French Bakery'
    },
    landmarks: ['Tafawa Balewa Square', 'Nigerian Stock Exchange', 'The Palms Mall'],
    averageDeliveryTime: '25-35 min'
  },
  {
    id: 2,
    name: 'Lekki',
    slug: 'lekki',
    description: 'Modern residential area known for trendy cafes and diverse dining options',
    image: 'https://picsum.photos/400/300?random=2',
    restaurantCount: 324,
    averageRating: 4.1,
    priceRange: '₦₦-₦₦₦',
    highlights: ['Trendy Cafes', 'Family Dining', 'Modern Atmosphere'],
    topCuisines: ['Nigerian', 'Italian', 'Asian', 'Fast Food'],
    featured: {
      restaurantName: 'Suya Spot Lekki',
      restaurantRating: 4.4,
      specialty: 'Nigerian BBQ'
    },
    landmarks: ['Lekki Conservation Centre', 'Admiralty Way', 'Lekki Toll Gate'],
    averageDeliveryTime: '20-30 min'
  },
  {
    id: 3,
    name: 'Ikoyi',
    slug: 'ikoyi',
    description: 'Prestigious neighborhood offering sophisticated dining experiences',
    image: 'https://picsum.photos/400/300?random=3',
    restaurantCount: 198,
    averageRating: 4.4,
    priceRange: '₦₦₦-₦₦₦₦',
    highlights: ['Luxury Dining', 'Hotel Restaurants', 'Exclusive Venues'],
    topCuisines: ['Contemporary Nigerian', 'International', 'Japanese', 'Mediterranean'],
    featured: {
      restaurantName: 'Nkoyo Restaurant',
      restaurantRating: 4.6,
      specialty: 'Contemporary Nigerian'
    },
    landmarks: ['Federal Palace Hotel', 'Ikoyi Club', 'Dodan Barracks'],
    averageDeliveryTime: '30-40 min'
  },
  {
    id: 4,
    name: 'Surulere',
    slug: 'surulere',
    description: 'Vibrant cultural hub with authentic local eateries and street food',
    image: 'https://picsum.photos/400/300?random=4',
    restaurantCount: 287,
    averageRating: 4.0,
    priceRange: '₦-₦₦',
    highlights: ['Authentic Local Food', 'Street Food', 'Cultural Experience'],
    topCuisines: ['Nigerian', 'Street Food', 'Traditional', 'Local Delicacies'],
    featured: {
      restaurantName: 'Ofada Heaven',
      restaurantRating: 4.7,
      specialty: 'Traditional Nigerian'
    },
    landmarks: ['National Stadium', 'Ojuelegba', 'Adeniran Ogunsanya Street'],
    averageDeliveryTime: '15-25 min'
  },
  {
    id: 5,
    name: 'Yaba',
    slug: 'yaba',
    description: 'Tech hub and student area with affordable eats and innovative dining',
    image: 'https://picsum.photos/400/300?random=5',
    restaurantCount: 156,
    averageRating: 3.9,
    priceRange: '₦-₦₦',
    highlights: ['Student-Friendly', 'Tech Hub', 'Budget Eats'],
    topCuisines: ['Fast Food', 'Nigerian', 'Chinese', 'Shawarma'],
    featured: {
      restaurantName: 'Mama Put Street Kitchen',
      restaurantRating: 4.8,
      specialty: 'Nigerian Street Food'
    },
    landmarks: ['University of Lagos', 'Yaba Tech', 'Herbert Macaulay Street'],
    averageDeliveryTime: '15-20 min'
  },
  {
    id: 6,
    name: 'Ikeja',
    slug: 'ikeja',
    description: 'Commercial center with shopping malls and diverse restaurant chains',
    image: 'https://picsum.photos/400/300?random=6',
    restaurantCount: 298,
    averageRating: 4.0,
    priceRange: '₦₦-₦₦₦',
    highlights: ['Shopping Malls', 'Chain Restaurants', 'Airport Access'],
    topCuisines: ['Nigerian', 'Indian', 'Chinese', 'Fast Food'],
    featured: {
      restaurantName: 'Bukka Hut Express',
      restaurantRating: 4.2,
      specialty: 'Nigerian Fast Food'
    },
    landmarks: ['Ikeja City Mall', 'Computer Village', 'Murtala Muhammed Airport'],
    averageDeliveryTime: '20-30 min'
  }
]

export default function CitySection() {
  const [selectedArea, setSelectedArea] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)
  
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4 // Desktop - show 4
      if (window.innerWidth >= 640) return 2 // Tablet - show 2
    }
    return 1 // Mobile - show 1
  }

  const [visibleCount, setVisibleCount] = useState(getVisibleCount())
  const totalSlides = Math.ceil(lagosAreas.length / visibleCount)

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % totalSlides
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || 0
      const gap = 24 // gap-6 = 24px
      const scrollPosition = index * visibleCount * (cardWidth + gap)
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    scrollToIndex(index)
  }

  useEffect(() => {
    const handleResize = () => {
      const newVisibleCount = getVisibleCount()
      setVisibleCount(newVisibleCount)
      setCurrentIndex(0) // Reset to first slide on resize
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Add touch/swipe support for mobile
    const container = scrollContainerRef.current
    if (!container) return

    let startX = 0
    let startScrollLeft = 0
    let isDragging = false

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
      startScrollLeft = container.scrollLeft
      isDragging = true
    }

    const handleTouchMove = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.touches[0].clientX
      const walk = (startX - x) * 2
      container.scrollLeft = startScrollLeft + walk
    }

    const handleTouchEnd = () => {
      isDragging = false
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  const totalRestaurants = lagosAreas.reduce((sum, area) => sum + area.restaurantCount, 0)
  const averageRating = (lagosAreas.reduce((sum, area) => sum + area.averageRating, 0) / lagosAreas.length).toFixed(1)

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">🏙️</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Explore Lagos by Area
            </h2>
          </div>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            From the upscale dining of Victoria Island to the authentic street food of Surulere, 
            discover the unique culinary character of each Lagos neighborhood.
          </p>
          
          {/* City Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-center mb-6">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-orange-600">{totalRestaurants.toLocaleString()}+</span>
              <span className="text-xs md:text-sm text-gray-600">Total Restaurants</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-green-600">{lagosAreas.length}</span>
              <span className="text-xs md:text-sm text-gray-600">Areas Covered</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-orange-600">{averageRating}★</span>
              <span className="text-xs md:text-sm text-gray-600">Average Rating</span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === 0}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-600 hover:bg-orange-700 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === totalSlides - 1}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Areas Carousel */}
        <div className="relative mb-6 md:mb-8">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {lagosAreas.map((area) => (
              <div key={area.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4">
                <div 
                  className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    selectedArea === area.id ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                  }`}
                >
                  {/* Area Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={area.image}
                      alt={`${area.name} skyline and dining scene`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    {/* Fallback gradient background */}
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-green-500 flex items-center justify-center" style={{ display: 'none' }}>
                      <span className="text-4xl text-white font-bold">
                        {area.name.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                
                {/* Stats Overlay */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="inline-flex items-center px-2 py-1 bg-white/90 text-gray-800 text-xs font-bold rounded-full">
                    {area.restaurantCount} restaurants
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-white/90 text-gray-800 text-xs font-bold rounded-full">
                    ⭐ {area.averageRating}
                  </span>
                </div>

                {/* Price Range */}
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-2 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                    {area.priceRange}
                  </span>
                </div>
              </div>

              {/* Area Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{area.name}</h3>
                  <span className="text-sm text-gray-500">{area.averageDeliveryTime}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {area.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {area.highlights.slice(0, 2).map((highlight, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full border border-orange-200"
                    >
                      {highlight}
                    </span>
                  ))}
                  {area.highlights.length > 2 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{area.highlights.length - 2}
                    </span>
                  )}
                </div>

                {/* Featured Restaurant */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Featured:</p>
                      <p className="text-sm text-orange-600 font-medium">{area.featured.restaurantName}</p>
                      <p className="text-xs text-gray-500">{area.featured.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">⭐</span>
                      <span className="text-sm font-medium">{area.featured.restaurantRating}</span>
                    </div>
                  </div>
                </div>

                {selectedArea === area.id && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    {/* Top Cuisines */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Popular Cuisines:</p>
                      <div className="flex flex-wrap gap-1">
                        {area.topCuisines.map((cuisine, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200"
                          >
                            {cuisine}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Landmarks */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Notable Landmarks:</p>
                      <div className="text-xs text-gray-600">
                        {area.landmarks.join(' • ')}
                      </div>
                    </div>
                  </div>
                )}

                {/* Explore Button */}
                <Link
                  href={`/restaurants?area=${area.slug}`}
                  className="block w-full px-4 py-2 bg-orange-600 text-white text-center font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
                >
                  Explore {area.name}
                </Link>
              </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mb-8 md:mb-12">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-orange-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Can't Find Your Area?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're constantly expanding our coverage across Lagos. If your neighborhood isn't listed yet, 
            help us grow by suggesting restaurants in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200">
              Suggest a Restaurant
            </button>
            <Link
              href="/areas"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors duration-200"
            >
              View All Areas
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}