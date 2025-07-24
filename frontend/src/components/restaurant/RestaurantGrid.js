'use client'

import { useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import RestaurantCardSkeleton from './RestaurantCardSkeleton'

// Mock data - will be replaced with API calls
const mockRestaurants = [
  {
    id: 1,
    name: 'Eric Kayser - Victoria Island',
    rating: 4.5,
    reviewCount: 4125,
    cuisine: 'French Bakery',
    area: 'Victoria Island',
    priceRange: '₦₦₦',
    image: '/restaurants/eric-kayser.jpg',
    highlights: ['Highly rated', 'Delivery available', 'Cafe'],
    address: '864a Bishop Aboyade Cole St, Victoria Island',
    phone: '+234 906 000 7275',
    website: 'https://www.maison-kayser.com',
    isOpen: true,
    nextOpenTime: null,
  },
  {
    id: 2,
    name: 'The GoodLife Restaurant',
    rating: 4.3,
    reviewCount: 2890,
    cuisine: 'Nigerian',
    area: 'Lekki',
    priceRange: '₦₦',
    image: '/restaurants/goodlife.jpg',
    highlights: ['Local favorite', 'Nigerian cuisine', 'Family-friendly'],
    address: 'Admiralty Way, Lekki Phase 1',
    phone: '+234 818 123 4567',
    website: null,
    isOpen: false,
    nextOpenTime: '9:00 AM tomorrow',
  },
  {
    id: 3,
    name: 'Ofada Heaven',
    rating: 4.7,
    reviewCount: 1567,
    cuisine: 'Nigerian',
    area: 'Surulere',
    priceRange: '₦',
    image: '/restaurants/ofada-heaven.jpg',
    highlights: ['Authentic ofada rice', 'Street food', 'Local gem'],
    address: 'Adeniran Ogunsanya Street, Surulere',
    phone: '+234 803 456 7890',
    website: null,
    isOpen: true,
    nextOpenTime: null,
  },
  {
    id: 4,
    name: 'Nkoyo Restaurant',
    rating: 4.6,
    reviewCount: 3456,
    cuisine: 'Nigerian',
    area: 'Ikoyi',
    priceRange: '₦₦₦',
    image: '/restaurants/nkoyo.jpg',
    highlights: ['Fine dining', 'Contemporary Nigerian', 'Date night'],
    address: 'Tafawa Balewa Square, Ikoyi',
    phone: '+234 701 234 5678',
    website: 'https://nkoyo.ng',
    isOpen: true,
    nextOpenTime: null,
  },
  {
    id: 5,
    name: 'Dynasty Chinese Restaurant',
    rating: 4.4,
    reviewCount: 2134,
    cuisine: 'Chinese',
    area: 'Victoria Island',
    priceRange: '₦₦₦',
    image: '/restaurants/dynasty.jpg',
    highlights: ['Authentic Chinese', 'Dim sum', 'Business lunch'],
    address: 'Adeola Odeku Street, Victoria Island',
    phone: '+234 809 876 5432',
    website: null,
    isOpen: false,
    nextOpenTime: '11:30 AM today',
  },
  {
    id: 6,
    name: 'Zest Restaurant',
    rating: 4.2,
    reviewCount: 1890,
    cuisine: 'Continental',
    area: 'Ikeja',
    priceRange: '₦₦',
    image: '/restaurants/zest.jpg',
    highlights: ['Continental cuisine', 'Airport nearby', 'Quick service'],
    address: 'Murtala Muhammed Airport Road, Ikeja',
    phone: '+234 802 345 6789',
    website: 'https://zestrestaurant.ng',
    isOpen: true,
    nextOpenTime: null,
  },
]

export default function RestaurantGrid({ 
  searchQuery, 
  selectedArea, 
  selectedCuisine, 
  sortBy,
  viewMode = 'grid' 
}) {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    
    setTimeout(() => {
      let filteredRestaurants = [...mockRestaurants]

      // Apply filters
      if (searchQuery) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      if (selectedArea) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.area === selectedArea
        )
      }

      if (selectedCuisine) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())
        )
      }

      // Apply sorting
      switch (sortBy) {
        case 'rating':
          filteredRestaurants.sort((a, b) => b.rating - a.rating)
          break
        case 'reviews':
          filteredRestaurants.sort((a, b) => b.reviewCount - a.reviewCount)
          break
        case 'price_low':
          filteredRestaurants.sort((a, b) => a.priceRange.length - b.priceRange.length)
          break
        case 'price_high':
          filteredRestaurants.sort((a, b) => b.priceRange.length - a.priceRange.length)
          break
        default:
          // Keep default order for relevance
          break
      }

      setRestaurants(filteredRestaurants)
      setLoading(false)
    }, 1000) // Simulate network delay
  }, [searchQuery, selectedArea, selectedCuisine, sortBy])

  if (loading) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <RestaurantCardSkeleton key={index} viewMode={viewMode} />
        ))}
      </div>
    )
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No restaurants found</h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your search criteria or browse all restaurants
        </p>
        <button
          onClick={() => {
            // Reset all filters
            window.location.reload()
          }}
          className="btn-primary"
        >
          Clear Filters
        </button>
      </div>
    )
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
        : 'grid-cols-1'
    }`}>
      {restaurants.map((restaurant) => (
        <RestaurantCard 
          key={restaurant.id} 
          restaurant={restaurant}
          viewMode={viewMode}
        />
      ))}
    </div>
  )
}