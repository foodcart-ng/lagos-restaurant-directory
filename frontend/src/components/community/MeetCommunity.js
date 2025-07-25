'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const communityMembers = [
  {
    id: 1,
    name: 'Adunni Olatunji',
    username: '@adunni_foodie',
    avatar: '/avatars/adunni.jpg',
    location: 'Victoria Island, Lagos',
    reviewCount: 127,
    followersCount: 2340,
    badge: 'Food Explorer',
    recentReview: {
      restaurantName: 'Nkoyo Restaurant',
      rating: 5,
      text: 'Absolutely amazing contemporary Nigerian cuisine! The jollof rice with grilled fish was perfectly seasoned.',
      date: '2 days ago'
    },
    specialties: ['Nigerian Cuisine', 'Fine Dining', 'Street Food'],
    isVerified: true,
  },
  {
    id: 2,
    name: 'Emeka Chukwu',
    username: '@emeka_eats',
    avatar: '/avatars/emeka.jpg',
    location: 'Lekki, Lagos',
    reviewCount: 89,
    followersCount: 1876,
    badge: 'Local Expert',
    recentReview: {
      restaurantName: 'Suya Spot Lekki',
      rating: 4,
      text: 'Best suya in Lekki! The meat is always fresh and the spice blend is perfect. Great late-night spot.',
      date: '4 days ago'
    },
    specialties: ['BBQ', 'Street Food', 'Local Spots'],
    isVerified: false,
  },
  {
    id: 3,
    name: 'Fatima Hassan',
    username: '@fatima_taste',
    avatar: '/avatars/fatima.jpg',
    location: 'Ikoyi, Lagos',
    reviewCount: 203,
    followersCount: 4521,
    badge: 'Top Reviewer',
    recentReview: {
      restaurantName: 'Yellow Chilli Restaurant',
      rating: 4,
      text: 'Authentic Indian flavors in the heart of Lagos. The butter chicken and naan bread were outstanding!',
      date: '1 week ago'
    },
    specialties: ['International Cuisine', 'Vegetarian', 'Fine Dining'],
    isVerified: true,
  },
  {
    id: 4,
    name: 'Tunde Adebayo',
    username: '@tunde_foodguy',
    avatar: '/avatars/tunde.jpg',
    location: 'Surulere, Lagos',
    reviewCount: 156,
    followersCount: 3102,
    badge: 'Budget Guru',
    recentReview: {
      restaurantName: 'Mama Put Street Kitchen',
      rating: 5,
      text: 'Incredible value for money! Authentic home-style cooking that reminds me of my grandmother.',
      date: '3 days ago'
    },
    specialties: ['Budget Eats', 'Traditional Food', 'Hidden Gems'],
    isVerified: false,
  },
  {
    id: 5,
    name: 'Kemi Ogundimu',
    username: '@kemi_foodlover',
    avatar: '/avatars/kemi.jpg',
    location: 'Ikeja, Lagos',
    reviewCount: 67,
    followersCount: 892,
    badge: 'Rising Star',
    recentReview: {
      restaurantName: 'Bukka Hut Express',
      rating: 4,
      text: 'Quick service and consistent quality. Perfect for a lunch break when you need good Nigerian food fast.',
      date: '5 days ago'
    },
    specialties: ['Fast Food', 'Nigerian Chains', 'Quick Bites'],
    isVerified: false,
  },
  {
    id: 6,
    name: 'David Okafor',
    username: '@david_dishes',
    avatar: '/avatars/david.jpg',
    location: 'Yaba, Lagos',
    reviewCount: 234,
    followersCount: 5678,
    badge: 'Influencer',
    recentReview: {
      restaurantName: 'Eric Kayser - Victoria Island',
      rating: 5,
      text: 'French pastries done right in Lagos! The croissants are buttery perfection and the coffee is excellent.',
      date: '1 day ago'
    },
    specialties: ['Bakeries', 'Coffee', 'International'],
    isVerified: true,
  },
]

export default function MeetCommunity() {
  const [followedUsers, setFollowedUsers] = useState(new Set())
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
  const totalSlides = Math.ceil(communityMembers.length / visibleCount)

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

  const handleFollowToggle = (userId) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
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

  const formatFollowersCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">👥</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Meet the Community
            </h2>
          </div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Connect with fellow food lovers, discover new restaurants through trusted reviews, 
            and share your dining experiences with Lagos' most passionate foodie community.
          </p>
          
          {/* Community Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-center mb-6">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-orange-600">25,000+</span>
              <span className="text-xs md:text-sm text-gray-600">Active Members</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-green-600">150,000+</span>
              <span className="text-xs md:text-sm text-gray-600">Reviews Written</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-orange-600">2,500+</span>
              <span className="text-xs md:text-sm text-gray-600">Restaurants Reviewed</span>
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

        {/* Community Members Carousel */}
        <div className="relative mb-6 md:mb-8">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {communityMembers.map((member) => (
              <div key={member.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Member Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {member.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.username}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleFollowToggle(member.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                      followedUsers.has(member.id)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                  >
                    {followedUsers.has(member.id) ? 'Following' : 'Follow'}
                  </button>
                </div>

                {/* Member Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span>📍</span>
                    <span>{member.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                    {member.badge}
                  </span>
                  <div className="flex gap-3 text-sm text-gray-600">
                    <span>{member.reviewCount} reviews</span>
                    <span>{formatFollowersCount(member.followersCount)} followers</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {member.specialties.slice(0, 2).map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                  {member.specialties.length > 2 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{member.specialties.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Recent Review */}
              <div className="px-6 pb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Link href="#" className="text-sm font-medium text-orange-600 hover:text-orange-700">
                      {member.recentReview.restaurantName}
                    </Link>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">⭐</span>
                      <span className="text-sm font-medium">{member.recentReview.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                    "{member.recentReview.text}"
                  </p>
                  <p className="text-xs text-gray-500">{member.recentReview.date}</p>
                </div>
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
        <div className="text-center bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Join Our Food-Loving Community
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Share your dining experiences, discover hidden gems, and connect with fellow food enthusiasts 
            across Lagos. Your taste buds will thank you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200">
              Join the Community
            </button>
            <Link
              href="/community"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors duration-200"
            >
              Explore Members
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}