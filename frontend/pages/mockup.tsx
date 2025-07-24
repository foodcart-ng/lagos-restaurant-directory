import React from 'react';

// Figma-style mockup for Lagos Restaurant Directory
export default function Mockup() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-8 h-8 bg-green-400 rounded-full" />
            <span className="text-xl font-bold tracking-tight text-gray-800">Lagos Restaurant Directory</span>
          </div>
          <nav className="flex gap-6 text-gray-600 font-medium">
            <a href="#" className="hover:text-green-500 transition">Home</a>
            <a href="#" className="hover:text-green-500 transition">Explore</a>
            <a href="#" className="hover:text-green-500 transition">About</a>
            <a href="#" className="hover:text-green-500 transition">Contact</a>
            <button className="ml-4 px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition">Add a Restaurant</button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative py-16 px-6 bg-gradient-to-br from-green-100 to-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80"
            alt="Nigerian jollof rice"
            className="w-full h-full object-cover object-center opacity-100"
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-white/30" />
        </div>
        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 drop-shadow">Discover the Best Restaurants in Lagos</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 drop-shadow">Explore, rate, and share your favorite dining spots across Lagos. Find vegan, local, and international cuisine with ease.</p>
          <div className="flex justify-center gap-2 max-w-xl mx-auto">
            <input type="text" placeholder="Search for a restaurant, area, or cuisine..." className="w-full px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
            <button className="px-6 py-3 rounded-r-md bg-green-500 text-white font-semibold hover:bg-green-600 transition">Search</button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="font-semibold text-gray-700">Filter by:</span>
          <select className="px-3 py-2 rounded border border-gray-300 bg-white">
            <option>Area</option>
            <option>Victoria Island</option>
            <option>Ikoyi</option>
            <option>Surulere</option>
            <option>Lekki</option>
          </select>
          <select className="px-3 py-2 rounded border border-gray-300 bg-white">
            <option>Cuisine</option>
            <option>Nigerian</option>
            <option>Vegan</option>
            <option>Continental</option>
          </select>
          <select className="px-3 py-2 rounded border border-gray-300 bg-white">
            <option>Rating</option>
            <option>4.5+</option>
            <option>4.0+</option>
            <option>3.5+</option>
          </select>
          <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition">Clear Filters</button>
        </div>
      </section>

      {/* Restaurant Listings */}
      <main className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1,2,3,4,5,6].map((id) => (
          <div key={id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col">
            <div className="h-48 w-full bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-5xl">🍽️</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Restaurant Name</h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">★ 4.7</span>
                <span className="text-xs text-gray-500">• Victoria Island</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">NTDC</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">NAFDAC</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Nigerian, Vegan, Continental</p>
              <button className="w-full py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition">View Details</button>
            </div>
          </div>
        ))}
      </main>

      {/* Sample Restaurant Detail (Mockup) */}
      <section className="max-w-3xl mx-auto px-6 mt-16 mb-20 bg-white rounded-2xl shadow-lg p-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 h-56 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Restaurant Name</h2>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-yellow-400">★ 4.7</span>
              <span className="text-xs text-gray-500">• Victoria Island</span>
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">NTDC</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">NAFDAC</span>
            </div>
            <p className="text-gray-600 mb-4">123 Restaurant Street, Victoria Island, Lagos</p>
            <div className="flex gap-4 mb-4">
              <button className="px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition">Book a Table</button>
              <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Get Directions</button>
            </div>
            <p className="text-gray-700 text-sm mb-2">Open: 10am - 11pm</p>
            <p className="text-gray-700 text-sm">Contact: +234 800 000 0000</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <span>&copy; 2025 Lagos Restaurant Directory</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-green-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-green-500 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
