'use client'

import { useState, useRef, useEffect } from 'react'
import SimpleRestaurantCard from './SimpleRestaurantCard'

const nearbyRestaurants = [
  {
    id: 101,
    name: 'Buka Restaurant',
    rating: 4.3,
    reviewCount: 892,
    cuisine: 'Nigerian',
    area: 'Victoria Island',
    priceRange: '₦₦',
    image: '/restaurants/buka.jpg',
    highlights: ['Local dishes', 'Quick service', 'Affordable'],
    address: 'Adeola Odeku Street, Victoria Island',
    phone: '+234 802 123 4567',
    website: null,
    isOpen: true,
    distance: '0.3 km',
  },
  {
    id: 102,
    name: 'Shoprite Food Court',
    rating: 4.1,
    reviewCount: 1234,
    cuisine: 'Mixed',
    area: 'Victoria Island',
    priceRange: '₦₦',
    image: '/restaurants/shoprite.jpg',
    highlights: ['Food court', 'Multiple options', 'Family friendly'],
    address: 'The Palms Shopping Mall, Victoria Island',
    phone: '+234 708 999 0000',
    website: 'https://shoprite.co.za',
    isOpen: true,
    distance: '0.5 km',
  },
  {
    id: 103,
    name: 'Mr. Biggs Express',
    rating: 3.9,
    reviewCount: 567,
    cuisine: 'Fast Food',
    area: 'Victoria Island',
    priceRange: '₦',
    image: '/restaurants/mr-biggs.jpg',
    highlights: ['Fast food', 'Nigerian chain', 'Drive-through'],
    address: 'Ajose Adeogun Street, Victoria Island',
    phone: '+234 805 111 2222',
    website: 'https://mrbiggs.ng',
    isOpen: false,
    distance: '0.7 km',
  },
  {
    id: 104,
    name: 'Terra Kulture Bistro',
    rating: 4.5,
    reviewCount: 2156,
    cuisine: 'Contemporary Nigerian',
    area: 'Victoria Island',
    priceRange: '₦₦₦',
    image: '/restaurants/terra-kulture.jpg',
    highlights: ['Cultural dining', 'Art gallery', 'Unique experience'],
    address: '1376 Tiamiyu Savage Street, Victoria Island',
    phone: '+234 806 326 5555',
    website: 'https://terrakulture.com',
    isOpen: true,
    distance: '0.9 km',
  },
  {
    id: 105,
    name: 'Chicken Republic',
    rating: 4.2,
    reviewCount: 1890,
    cuisine: 'Fast Food',
    area: 'Victoria Island',
    priceRange: '₦₦',
    image: '/restaurants/chicken-republic.jpg',
    highlights: ['Fried chicken', 'Popular chain', 'Quick meals'],
    address: 'Ozumba Mbadiwe Avenue, Victoria Island',
    phone: '+234 700 CHICKEN',
    website: 'https://chickenrepublic.com',
    isOpen: true,
    distance: '1.1 km',
  },
  {
    id: 106,
    name: 'Mama Cass Restaurant',
    rating: 4.4,
    reviewCount: 987,
    cuisine: 'Nigerian',
    area: 'Victoria Island',
    priceRange: '₦₦',
    image: '/restaurants/mama-cass.jpg',
    highlights: ['Home-style cooking', 'Generous portions', 'Local favorite'],
    address: 'Ahmadu Bello Way, Victoria Island',
    phone: '+234 803 777 8888',
    website: null,
    isOpen: true,
    distance: '1.3 km',
  },
]

const lagosAreas = [
  'Victoria Island',
  'Ikoyi',
  'Lekki',
  'Surulere',
  'Yaba',
  'Ikeja',
  'Ajah',
  'Maryland'
]

export default function NearbyRestaurants() {
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
  const totalSlides = Math.ceil(nearbyRestaurants.length / visibleCount)

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
      const gap = 16 // gap-4 = 16px
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

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">📍</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Restaurants Near You
            </h2>
          </div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Discover great food options around you
          </p>

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
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === totalSlides - 1}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Restaurant Carousel */}
        <div className="relative mb-6 md:mb-8">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {nearbyRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4">
                <SimpleRestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mb-6 md:mb-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
    
        </div>
        
      </div>
    </section>
  )
}