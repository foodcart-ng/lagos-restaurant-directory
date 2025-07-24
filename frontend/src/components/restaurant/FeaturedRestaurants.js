'use client'

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
    highlights: ['Highly rated', 'Delivery available', 'Cafe'],
    address: '864a Bishop Aboyade Cole St, Victoria Island',
    phone: '+234 906 000 7275',
    website: 'https://www.maison-kayser.com',
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
]

export default function FeaturedRestaurants() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Restaurants
            </h2>
            <p className="text-lg text-gray-600">
              Discover our hand-picked selection of Lagos' finest dining experiences
            </p>
          </div>
          
          <Link
            href="/discover"
            className="hidden sm:inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            View all
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center sm:hidden">
          <Link
            href="/discover"
            className="inline-flex items-center btn-primary"
          >
            View all restaurants
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}