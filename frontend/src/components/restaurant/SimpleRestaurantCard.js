'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SimpleRestaurantCard({ restaurant, isSponsored = false }) {
  const {
    id,
    name,
    rating,
    reviewCount,
    image,
    cuisine,
    isOpen,
    highlights
  } = restaurant

  const [isFavorite, setIsFavorite] = useState(false)

  const formatReviewCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image || "/placeholder-restaurant.svg"}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTIwQzIwOC4yODQgMTIwIDIxNSAxMjYuNzE2IDIxNSAxMzVDMjE1IDE0My4yODQgMjA4LjI4NCAxNTAgMjAwIDE1MEMxOTEuNzE2IDE1MCAxODUgMTQzLjI4NCAxODUgMTM1QzE4NSAxMjYuNzE2IDE5MS43MTYgMTIwIDIwMCAxMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xNjAgMTgwSDI0MFYxODBIMTYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'
          }}
        />
        
        {/* Status Banner - Bottom Left */}
        <div className="absolute bottom-2 left-0">
          {isOpen ? (
            <div className="relative bg-green-500 text-white text-xs font-medium px-3 py-1 shadow-md">
              <span>Open Now</span>
              {/* Banner flag tail */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-b-[12px] border-l-[8px] border-t-transparent border-b-transparent border-l-green-500 translate-x-full"></div>
            </div>
          ) : (
            <div className="relative bg-red-500 text-white text-xs font-medium px-3 py-1 shadow-md">
              <span>Closed</span>
              {/* Banner flag tail */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-b-[12px] border-l-[8px] border-t-transparent border-b-transparent border-l-red-500 translate-x-full"></div>
            </div>
          )}
        </div>
        
        {/* Favorite Heart - Top Right */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-200 z-10"
        >
          <svg 
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>

        {/* Sponsored Overlay - Top Left */}
        {isSponsored && (
          <div className="absolute top-2 left-2">
            <span className="inline-block px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded-full shadow-md">
              Sponsored
            </span>
          </div>
        )}
      </div>

      {/* Content - Simplified */}
      <div className="p-3 md:p-4">
        <Link href={`/restaurant/${id}`} className="block hover:text-green-600 transition-colors duration-200">
          <h3 className="font-semibold text-base md:text-lg text-gray-900 mb-2 line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Rating & Reviews Only */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="ml-1 font-medium text-gray-900 text-sm">{rating}</span>
            <span className="ml-1 text-xs text-gray-500">({formatReviewCount(reviewCount)} reviews)</span>
            <span className="mx-1 md:mx-2 text-gray-300 text-xs">•</span>
            <span className="text-xs md:text-sm text-gray-600 truncate">{cuisine}</span>
          </div>
        </div>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {highlights.slice(0, 2).map((highlight, index) => (
              <span
                key={index}
                className="inline-block px-2 py-0.5 bg-orange-50 text-orange-700 text-xs rounded-full border border-orange-200 truncate max-w-[100px]"
              >
                {highlight}
              </span>
            ))}
            {highlights.length > 2 && (
              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{highlights.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}