'use client'

import { useState } from 'react'

export default function FilterSidebar({ 
  isOpen, 
  onClose, 
  selectedArea, 
  selectedCuisine,
  onAreaChange,
  onCuisineChange 
}) {
  const [expandedSections, setExpandedSections] = useState({
    area: true,
    cuisine: true,
    price: true,
    features: true,
    rating: true,
  })

  const [selectedPriceRange, setSelectedPriceRange] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedFeatures, setSelectedFeatures] = useState([])

  const areas = [
    'Victoria Island', 'Lekki', 'Ikoyi', 'Surulere', 'Ikeja', 'Yaba',
    'Maryland', 'Gbagada', 'Magodo', 'Festac', 'Ojodu', 'Berger'
  ]

  const cuisines = [
    'Nigerian', 'Continental', 'Chinese', 'Lebanese', 'Italian', 'Indian',
    'Japanese', 'Mexican', 'American', 'French', 'Thai', 'Mediterranean'
  ]

  const priceRanges = [
    { value: '1', label: '₦ - Budget friendly', description: 'Under ₦5,000' },
    { value: '2', label: '₦₦ - Moderate', description: '₦5,000 - ₦15,000' },
    { value: '3', label: '₦₦₦ - Expensive', description: '₦15,000 - ₦30,000' },
    { value: '4', label: '₦₦₦₦ - Fine dining', description: 'Above ₦30,000' },
  ]

  const features = [
    'Delivery available', 'Takeout', 'Dine-in', 'Outdoor seating',
    'Parking available', 'WiFi', 'Air conditioning', 'Live music',
    'Private dining', 'Bar', 'Breakfast', 'Lunch', 'Dinner',
    'Credit cards accepted', 'Wheelchair accessible', 'Kid-friendly'
  ]

  const ratings = [
    { value: '4', label: '4+ stars' },
    { value: '3', label: '3+ stars' },
    { value: '2', label: '2+ stars' },
  ]

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  const clearAllFilters = () => {
    onAreaChange('')
    onCuisineChange('')
    setSelectedPriceRange('')
    setSelectedRating('')
    setSelectedFeatures([])
  }

  if (!isOpen) return null

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto
        w-80 lg:w-64 bg-white z-50 lg:z-auto
        transform lg:transform-none transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 lg:hidden"
            >
              <span className="text-gray-500">✕</span>
            </button>
          </div>
        </div>

        {/* Filters Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Area Filter */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('area')}
              className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
            >
              Area
              {expandedSections.area ? '▲' : '▼'}
            </button>
            {expandedSections.area && (
              <div className="pb-4 px-4 space-y-2">
                {areas.map((area) => (
                  <label key={area} className="flex items-center">
                    <input
                      type="radio"
                      name="area"
                      value={area}
                      checked={selectedArea === area}
                      onChange={(e) => onAreaChange(e.target.value)}
                      className="mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Cuisine Filter */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('cuisine')}
              className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
            >
              Cuisine
              {expandedSections.cuisine ? '▲' : '▼'}
            </button>
            {expandedSections.cuisine && (
              <div className="pb-4 px-4 space-y-2">
                {cuisines.map((cuisine) => (
                  <label key={cuisine} className="flex items-center">
                    <input
                      type="radio"
                      name="cuisine"
                      value={cuisine}
                      checked={selectedCuisine === cuisine}
                      onChange={(e) => onCuisineChange(e.target.value)}
                      className="mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{cuisine}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
            >
              Price Range
              {expandedSections.price ? '▲' : '▼'}
            </button>
            {expandedSections.price && (
              <div className="pb-4 px-4 space-y-3">
                {priceRanges.map((range) => (
                  <label key={range.value} className="flex items-start">
                    <input
                      type="radio"
                      name="price"
                      value={range.value}
                      checked={selectedPriceRange === range.value}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="mr-3 mt-0.5 text-primary-600 focus:ring-primary-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{range.label}</div>
                      <div className="text-xs text-gray-500">{range.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('rating')}
              className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
            >
              Rating
              {expandedSections.rating ? '▲' : '▼'}
            </button>
            {expandedSections.rating && (
              <div className="pb-4 px-4 space-y-2">
                {ratings.map((rating) => (
                  <label key={rating.value} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating.value}
                      checked={selectedRating === rating.value}
                      onChange={(e) => setSelectedRating(e.target.value)}
                      className="mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{rating.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Features Filter */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('features')}
              className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
            >
              Features
              {expandedSections.features ? '▲' : '▼'}
            </button>
            {expandedSections.features && (
              <div className="pb-4 px-4 space-y-2 max-h-64 overflow-y-auto">
                {features.map((feature) => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="mr-3 text-primary-600 focus:ring-primary-500 rounded"
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}