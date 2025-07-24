'use client'

import { useState } from 'react'

export default function Hero({ onSearch, onAreaSelect, onCuisineSelect }) {
  const [query, setQuery] = useState('')
  const [area, setArea] = useState('')

  const popularAreas = [
    'Victoria Island', 'Lekki', 'Ikoyi', 'Surulere', 'Ikeja', 'Yaba'
  ]

  const popularCuisines = [
    'Nigerian', 'Continental', 'Chinese', 'Lebanese', 'Italian', 'Indian'
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch?.(query)
    onAreaSelect?.(area)
  }

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-nigeria-50 py-16 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      
      <div className="relative container-max section-padding">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Content */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Discover Lagos'
            <span className="text-primary-500 block">Best Restaurants</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto text-balance">
            From street food gems to fine dining experiences, explore the vibrant culinary scene of Lagos, Nigeria.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Restaurant name, cuisine, or dish..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:ring-0 focus:outline-none"
                  />
                </div>

                {/* Area Selector */}
                <div className="relative md:w-64">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📍</span>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-transparent border-0 focus:ring-0 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="">All Areas</option>
                    {popularAreas.map((areaName) => (
                      <option key={areaName} value={areaName}>
                        {areaName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-4">Popular cuisines:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularCuisines.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => onCuisineSelect?.(cuisine)}
                  className="filter-chip hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 border border-transparent"
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative mt-16 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container-max section-padding py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">2,500+</div>
              <div className="text-sm text-gray-600">Restaurants</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">50,000+</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">20+</div>
              <div className="text-sm text-gray-600">Areas Covered</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">100+</div>
              <div className="text-sm text-gray-600">Cuisines</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}