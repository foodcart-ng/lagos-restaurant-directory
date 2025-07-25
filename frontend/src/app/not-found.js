'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Large 404 with Nigerian-inspired styling */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text">
            404
          </h1>
        </div>

        {/* Nigerian food emoji and message */}
        <div className="mb-6">
          <div className="text-6xl mb-4">🍛</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Dish Not Found!
          </h2>
          <p className="text-gray-600 mb-2">
            This page has wandered off like jollof rice at a party.
          </p>
          <p className="text-gray-600">
            Let's get you back to discovering Lagos' best restaurants!
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            🏠 Back to Home
          </Link>
          
          <Link 
            href="/restaurants"
            className="inline-block w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            🍽️ Browse Restaurants
          </Link>
        </div>

        {/* Lagos areas quick links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Or explore by area:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Victoria Island', 'Lekki', 'Ikoyi', 'Surulere'].map((area) => (
              <Link
                key={area}
                href={`/restaurants?area=${area.toLowerCase().replace(' ', '-')}`}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>

        {/* Fun Lagos reference */}
        <div className="mt-6 text-xs text-gray-400">
          "Even GPS gets lost in Lagos traffic sometimes 🚗"
        </div>
      </div>
    </div>
  )
}