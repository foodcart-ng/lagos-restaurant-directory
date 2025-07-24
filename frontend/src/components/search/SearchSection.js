'use client'

import { useState } from 'react'
import RestaurantGrid from '@/components/restaurant/RestaurantGrid'
import FilterSidebar from '@/components/filters/FilterSidebar'

export default function SearchSection({ 
  searchQuery, 
  selectedArea, 
  selectedCuisine,
  onSearchChange,
  onAreaChange, 
  onCuisineChange 
}) {
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState('grid') // grid or list

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
  ]

  return (
    <section className="py-8 lg:py-12 bg-gray-50">
      <div className="container-max section-padding">
        {/* Search Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {searchQuery || selectedArea || selectedCuisine ? (
                <>
                  Search Results
                  {searchQuery && (
                    <span className="text-primary-600"> for "{searchQuery}"</span>
                  )}
                  {selectedArea && (
                    <span className="text-primary-600"> in {selectedArea}</span>
                  )}
                  {selectedCuisine && (
                    <span className="text-primary-600"> • {selectedCuisine} cuisine</span>
                  )}
                </>
              ) : (
                'Explore Restaurants'
              )}
            </h2>
            <p className="text-gray-600">Found 1,247 restaurants</p>
          </div>

          {/* Desktop Sort & View Controls */}
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <span>🔽</span>
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedArea || selectedCuisine) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-medium text-gray-500">Active filters:</span>
            
            {searchQuery && (
              <div className="flex items-center space-x-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:bg-primary-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </div>
            )}

            {selectedArea && (
              <div className="flex items-center space-x-1 bg-nigeria-100 text-nigeria-800 px-3 py-1 rounded-full text-sm">
                <span>{selectedArea}</span>
                <button
                  onClick={() => onAreaChange('')}
                  className="ml-1 hover:bg-nigeria-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </div>
            )}

            {selectedCuisine && (
              <div className="flex items-center space-x-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                <span>{selectedCuisine}</span>
                <button
                  onClick={() => onCuisineChange('')}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar 
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            selectedArea={selectedArea}
            selectedCuisine={selectedCuisine}
            onAreaChange={onAreaChange}
            onCuisineChange={onCuisineChange}
          />

          {/* Restaurant Grid */}
          <div className="flex-1">
            <RestaurantGrid 
              searchQuery={searchQuery}
              selectedArea={selectedArea}
              selectedCuisine={selectedCuisine}
              sortBy={sortBy}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </section>
  )
}