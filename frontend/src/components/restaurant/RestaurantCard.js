'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function RestaurantCard({ restaurant, viewMode = 'grid' }) {
  const {
    id,
    name,
    rating,
    reviewCount,
    cuisine,
    area,
    priceRange,
    image,
    highlights,
    isOpen,
    nextOpenTime,
  } = restaurant

  const formatReviewCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="/placeholder-restaurant.jpg"
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTIwQzIwOC4yODQgMTIwIDIxNSAxMjYuNzE2IDIxNSAxMzVDMjE1IDE0My4yODQgMjA4LjI4NCAxNTAgMjAwIDE1MEMxOTEuNzE2IDE1MCAxODUgMTQzLjI4NCAxODUgMTM1QzE4NSAxMjYuNzE2IDE5MS43MTYgMTIwIDIwMCAxMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xNjAgMTgwSDI0MFYxODBIMTYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'
          }}
        />
        
        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          {isOpen ? (
            <span className="inline-flex items-center px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
              <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></div>
              Open now
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></div>
              Closed
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/restaurant/${id}`} className="block hover:text-orange-600 transition-colors duration-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate">
            {name}
          </h3>
        </Link>

        {/* Rating & Reviews */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="ml-1 font-medium text-gray-900">{rating}</span>
            <span className="ml-1 text-sm text-gray-500">({formatReviewCount(reviewCount)})</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-600">{cuisine}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm font-medium text-gray-900">{priceRange}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-1">📍</span>
          <span className="truncate">{area}</span>
        </div>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {highlights.slice(0, 2).map((highlight, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {highlight}
              </span>
            ))}
            {highlights.length > 2 && (
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{highlights.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Opening Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">🕒</span>
            {isOpen ? (
              <span className="text-green-600 font-medium">Open now</span>
            ) : (
              <span className="text-red-600 font-medium">
                Closed
                {nextOpenTime && (
                  <span className="text-gray-500 ml-1">• Opens {nextOpenTime}</span>
                )}
              </span>
            )}
          </div>

          <button className="text-orange-600 hover:text-orange-700 font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}