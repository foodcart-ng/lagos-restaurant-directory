'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import RestaurantCard from './RestaurantCard'

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
  const [selectedArea, setSelectedArea] = useState('Victoria Island')
  const [userLocation, setUserLocation] = useState(null)
  const [showAllRestaurants, setShowAllRestaurants] = useState(false)

  useEffect(() => {
    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            area: 'Victoria Island' // Mock detected area
          })
        },
        (error) => {
          console.log('Location access denied or unavailable')
          // Default to Victoria Island
          setUserLocation({ area: 'Victoria Island' })
        }
      )
    } else {
      setUserLocation({ area: 'Victoria Island' })
    }
  }, [])

  const filteredRestaurants = nearbyRestaurants.filter(
    restaurant => restaurant.area === selectedArea
  )

  const restaurantsToShow = showAllRestaurants 
    ? filteredRestaurants 
    : filteredRestaurants.slice(0, 4)

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
          <p className="text-base md:text-lg text-gray-600 mb-6">
            {userLocation ? 
              `Discover great food options in ${selectedArea}` :
              'Select your area to find nearby restaurants'
            }
          </p>

          {/* Location Detection Status */}
          {userLocation && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Currently in {userLocation.area}
            </div>
          )}
        </div>

        {/* Area Selector */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {lagosAreas.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-3 md:px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                  selectedArea === area
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Distance and Filter Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 px-4 py-3 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span className="text-gray-600 text-sm">
              📍 Showing {filteredRestaurants.length} restaurants in {selectedArea}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>🚶 Walking distance</span>
            <span>•</span>
            <span>⭐ Rated 3.5+</span>
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {restaurantsToShow.map((restaurant) => (
            <div key={restaurant.id} className="relative">
              <RestaurantCard restaurant={restaurant} />
              {/* Distance Badge */}
              <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                {restaurant.distance}
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {filteredRestaurants.length > 4 && (
          <div className="text-center mb-6 md:mb-8">
            <button
              onClick={() => setShowAllRestaurants(!showAllRestaurants)}
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors duration-200"
            >
              {showAllRestaurants ? (
                <>
                  Show Less
                  <svg className="ml-2 w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              ) : (
                <>
                  Show {filteredRestaurants.length - 4} More in {selectedArea}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/restaurants?area=${selectedArea.toLowerCase().replace(' ', '-')}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            View All in {selectedArea}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <button className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200">
            📍 Enable Location Services
          </button>
        </div>

        {/* Quick Stats for Selected Area */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 md:p-4">
              <div className="text-xl md:text-2xl font-bold text-orange-600">{filteredRestaurants.length}</div>
              <div className="text-xs md:text-sm text-gray-600">In {selectedArea}</div>
            </div>
            <div className="p-3 md:p-4">
              <div className="text-xl md:text-2xl font-bold text-green-600">0.5km</div>
              <div className="text-xs md:text-sm text-gray-600">Avg Distance</div>
            </div>
            <div className="p-3 md:p-4">
              <div className="text-xl md:text-2xl font-bold text-orange-600">15min</div>
              <div className="text-xs md:text-sm text-gray-600">Avg Delivery</div>
            </div>
            <div className="p-3 md:p-4">
              <div className="text-xl md:text-2xl font-bold text-green-600">₦₦</div>
              <div className="text-xs md:text-sm text-gray-600">Avg Price</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}