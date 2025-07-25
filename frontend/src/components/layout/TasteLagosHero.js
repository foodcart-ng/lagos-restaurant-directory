'use client'

import { useState } from 'react'

export default function TasteLagosHero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  const popularTags = ['Jollof Rice', 'Suya', 'Nigerian', 'Continental', 'Seafood']
  return (
    <section className="relative py-12 md:py-20 px-4 md:px-6 bg-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        { <img
          src="/femi-oyekoya-rbEtzd20Qcw-unsplash.jpg"
          alt="Delicious Nigerian jollof rice with grilled fish and suya"
          className="h-full w-full object-cover object-center opacity-1000"
        /> }
        {/* Light green gradient overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-green-300/20" /> */}
      </div>
      
      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto text-center z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
          Discover Lagos<br />
          <span className="text-green-600">on a Plate</span>
        </h1>
        <p className="text-base md:text-xl text-white mb-8 md:mb-12 max-w-2xl mx-auto px-4">
          Explore, rate, and share your favorite dining spots across Lagos. Find vegan, local, and international cuisine with ease.
        </p>
        
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex justify-center gap-0 max-w-2xl mx-auto mb-6 md:mb-8 shadow-lg rounded-lg overflow-hidden">
          <input 
            type="text" 
            placeholder="Search for a restaurant, area, or cuisine..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border-0 focus:outline-none focus:ring-0 bg-white placeholder-gray-500"
          />
          <button 
            type="submit"
            className="px-6 md:px-8 py-3 md:py-4 bg-green-600 text-white font-semibold hover:bg-green-700 transition text-base md:text-lg"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
        
        {/* Popular tags */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
          <span className="font-semibold md:text-base">Popular:</span>
          {popularTags.map((tag) => (
            <button 
              key={tag}
              className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-xs md:text-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

    </section>
  )
}