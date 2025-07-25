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
  } = restaurant

  const formatReviewCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="/placeholder-restaurant.jpg"
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTIwQzIwOC4yODQgMTIwIDIxNSAxMjYuNzE2IDIxNSAxMzVDMjE1IDE0My4yODQgMjA4LjI4NCAxNTAgMjAwIDE1MEMxOTEuNzE2IDE1MCAxODUgMTQzLjI4NCAxODUgMTM1QzE4NSAxMjYuNzE2IDE5MS43MTYgMTIwIDIwMCAxMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xNjAgMTgwSDI0MFYxODBIMTYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'
          }}
        />
        
        {/* Status Badge */}
        {/* <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3">
          {isOpen ? (
            <span className="inline-flex items-center px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full shadow-md">
              <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></div>
              Open now
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full shadow-md">
              <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></div>
              Closed
            </span>
          )}
        </div> */}

        {/* Price Range Badge */}
        {/* <div className="absolute top-2 right-2 md:top-3 md:right-3">
          <span className="inline-block px-2 py-1 bg-white/90 text-gray-800 text-xs font-bold rounded-full shadow-md">
            {priceRange}
          </span>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-3 md:p-4">
        <Link href={`/restaurant/${id}`} className="block hover:text-orange-600 transition-colors duration-200">
          <h3 className="font-semibold text-base md:text-lg text-gray-900 mb-2 line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Rating & Reviews */}
        <div className="flex items-center mb-2 md:mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="ml-1 font-medium text-gray-900 text-sm">{rating}</span>
            <span className="ml-1 text-xs text-gray-500">({formatReviewCount(reviewCount)})</span>
          </div>
          <span className="mx-1 md:mx-2 text-gray-300 text-xs">•</span>
          <span className="text-xs md:text-sm text-gray-600 truncate">{cuisine}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
          <span className="mr-1">📍</span>
          <span className="truncate">{area}</span>
        </div>

        {/* Highlights - Mobile Optimized */}
        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
            {highlights.slice(0, viewMode === 'grid' ? 2 : 3).map((highlight, index) => (
              <span
                key={index}
                className="inline-block px-2 py-0.5 md:py-1 bg-orange-50 text-orange-700 text-xs rounded-full border border-orange-200"
              >
                {highlight}
              </span>
            ))}
            {highlights.length > (viewMode === 'grid' ? 2 : 3) && (
              <span className="inline-block px-2 py-0.5 md:py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{highlights.length - (viewMode === 'grid' ? 2 : 3)}
              </span>
            )}
          </div>
        )}

        {/* Bottom Section - Mobile Optimized */}
        <div className="flex items-center justify-between text-xs md:text-sm pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">🕒</span>
            {isOpen ? (
              <span className="text-green-600 font-medium">Open</span>
            ) : (
              <span className="text-red-600 font-medium">Closed</span>
            )}
          </div>

          <Link
            href={`/restaurant/${id}`}
            className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}