'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import RestaurantCard from './RestaurantCard'

const featuredRestaurants = [
  {
    id: 1,
    name: 'Eric Kayser - Victoria Island',
    rating: 4.5,
    reviewCount: 4125,
    cuisine: 'French Bakery',
    area: 'Victoria Island',
    priceRange: '₦₦₦',
    image: '/restaurants/eric-kayser.jpg',
    highlights: ['Highly rated', 'Delivery available', 'French pastries', 'Free Wi-Fi'],
    address: '864a Bishop Aboyade Cole St, Victoria Island',
    phone: '+234 906 000 7275',
    website: 'https://www.maison-kayser.com',
    isOpen: true,
    nextOpenTime: null,
  },
  {
    id: 2,
    name: 'Mama Put Street Kitchen',
    rating: 4.8,
    reviewCount: 2345,
    cuisine: 'Nigerian Street Food',
    area: 'Yaba',
    priceRange: '₦',
    image: '/restaurants/mama-put.jpg',
    highlights: ['Authentic jollof', 'Budget friendly', 'Local favorite'],
    address: 'Herbert Macaulay Street, Yaba',
    phone: '+234 802 345 6789',
    website: null,
    isOpen: false,
    nextOpenTime: '7:00 AM',
  },
  {
    id: 3,
    name: 'The Wheatbaker Hotel Restaurant',
    rating: 4.6,
    reviewCount: 3890,
    cuisine: 'Continental',
    area: 'Ikoyi',
    priceRange: '₦₦₦₦',
    image: '/restaurants/wheatbaker.jpg',
    highlights: ['Fine dining', 'Hotel restaurant', 'Business meetings'],
    address: '11 Akin Olugbade Street, Ikoyi',
    phone: '+234 706 000 0001',
    website: 'https://thewheatbaker.com',
    isOpen: true,
    nextOpenTime: null,
  },
  {
    id: 4,
    name: 'Suya Spot Lekki',
    rating: 4.4,
    reviewCount: 1876,
    cuisine: 'Nigerian BBQ',
    area: 'Lekki',
    priceRange: '₦₦',
    image: '/restaurants/suya-spot.jpg',
    highlights: ['Best suya in Lagos', 'Late night', 'Outdoor seating'],
    address: 'Admiralty Way, Lekki Phase 1',
    phone: '+234 813 456 7890',
    website: null,
    isOpen: true,
    nextOpenTime: null,
  },
  {
    id: 5,
    name: 'Yellow Chilli Restaurant',
    rating: 4.3,
    reviewCount: 5230,
    cuisine: 'Indian',
    area: 'Victoria Island',
    priceRange: '₦₦₦',
    image: '/restaurants/yellow-chilli.jpg',
    highlights: ['Authentic Indian', 'Vegetarian options', 'Spicy dishes'],
    address: '267A Etim Inyang Crescent, Victoria Island',
    phone: '+234 708 765 4321',
    website: 'https://yellowchilli.ng',
    isOpen: false,
    nextOpenTime: '12:00 PM',
  },
  {
    id: 6,
    name: 'Bukka Hut Express',
    rating: 4.2,
    reviewCount: 3450,
    cuisine: 'Nigerian Fast Food',
    area: 'Ikeja',
    priceRange: '₦₦',
    image: '/restaurants/bukka-hut.jpg',
    highlights: ['Quick service', 'Multiple locations', 'Comfort food'],
    address: 'Allen Avenue, Ikeja',
    phone: '+234 803 000 2000',
    website: 'https://bukkahut.com',
    isOpen: true,
    nextOpenTime: null,
  },
]

export default function FeaturedRestaurants() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3 // Desktop - show 3
      if (window.innerWidth >= 640) return 2 // Tablet - show 2
    }
    return 1 // Mobile - show 1
  }

  const [visibleCount, setVisibleCount] = useState(getVisibleCount())

  const totalSlides = Math.ceil(featuredRestaurants.length / visibleCount)

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
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 md:mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Featured Restaurants
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Discover our hand-picked selection of Lagos' finest dining experiences
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation Arrows */}
            <div className="flex gap-2">
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

            <Link
              href="/restaurants"
              className="hidden sm:inline-flex items-center text-green-600 hover:text-green-700 font-bold transition-colors duration-200 text-sm md:text-base"
            >
              View all
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Restaurant Carousel */}
        <div className="relative mb-6 md:mb-8">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
                <RestaurantCard restaurant={restaurant} />
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

        {/* Mobile View All Button */}
        <div className="text-center sm:hidden">
          <Link
            href="/restaurants"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            View all restaurants
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Quick Stats Section - Mobile Optimized
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 md:p-4">
              <div className="text-xl md:text-2xl font-bold text-orange-600">2,500+</div>
              <div className="text-xs md:text-sm text-gray-600">Restaurants</div>
            </div>
            <div className="p-3 md:p-4">
              <div className="text-xl md:text-2xl font-bold text-green-600">20+</div>
              <div className="text-xs md:text-sm text-gray-600">Areas</div>
            </div>
            <div className="p-3 md:p-4">
              <div className="text-xl md:text-2xl font-bold text-orange-600">50k+</div>
              <div className="text-xs md:text-sm text-gray-600">Reviews</div>
            </div>
            <div className="p-3 md:p-4">
              <div className="text-xl md:text-2xl font-bold text-green-600">95%</div>
              <div className="text-xs md:text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}