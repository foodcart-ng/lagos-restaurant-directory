'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function SimpleRestaurantCard({ restaurant }) {
  const {
    id,
    name,
    rating,
    reviewCount,
    image,
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
      </div>

      {/* Content - Simplified */}
      <div className="p-3 md:p-4">
        <Link href={`/restaurant/${id}`} className="block hover:text-orange-600 transition-colors duration-200">
          <h3 className="font-semibold text-base md:text-lg text-gray-900 mb-2 line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Rating & Reviews Only */}
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="ml-1 font-medium text-gray-900 text-sm">{rating}</span>
            <span className="ml-1 text-xs text-gray-500">({formatReviewCount(reviewCount)} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  )
}