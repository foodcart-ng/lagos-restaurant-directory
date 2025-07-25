import React, { useRef } from 'react';
import Head from 'next/head';

// Figma-style mockup for Lagos Restaurant Directory
export default function Mockup() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };
  return (
    <>
      <Head>
        <title>TasteLagos | Discover Top Restaurants & Street Food in Lagos</title>
        <meta name="description" content="Explore the best restaurants, street food spots, and hidden gems in Lagos. TasteLagos is your go-to guide for where to eat and what to try in the city." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-xl font-bold text-green-600">Taste</span>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-1">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41-6.88-6.88 1.37-1.37z"/>
                  <circle cx="12" cy="12" r="1.5"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-orange-500">Lagos</span>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="flex items-center gap-8 text-gray-700 font-medium">
              <div className="relative group">
                <a href="#" className="hover:text-green-500 transition flex items-center gap-1">
                  Explore
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition">
                      Restaurants Nearby
                    </a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition">
                      Top Rated
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition">
                      Street Food Spots
                    </a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition">
                      Add a Listing
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition">
                      Write Review
                    </a>
                  </div>
                </div>
              </div>
              <a href="#" className="hover:text-green-500 transition">Events</a>
              <a href="#" className="hover:text-green-500 transition">Blog</a>
              <a href="#" className="hover:text-green-500 transition">Contact</a>
              <a href="#" className="hover:text-green-500 transition">About Us</a>
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-green-500 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login/ Sign up
            </a>
            <button className="px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition flex items-center gap-2">
              Add Listing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative py-20 px-6 bg-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80"
            alt="Nigerian jollof rice"
            className="w-full h-full object-cover object-center opacity-60"
          />
          {/* Light overlay for readability */}
          <div className="absolute inset-0 bg-white/50" />
        </div>
        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Lagos<br />
            <span className="text-green-600">on a Plate</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Explore, rate, and share your favorite dining spots across Lagos. Find vegan, local, and international cuisine with ease.</p>
          
          {/* Search bar */}
          <div className="flex justify-center gap-0 max-w-2xl mx-auto mb-8 shadow-lg rounded-lg overflow-hidden">
            <input 
              type="text" 
              placeholder="Search for a restaurant, area, or cuisine..." 
              className="flex-1 px-6 py-4 text-lg border-0 focus:outline-none focus:ring-0 bg-white"
            />
            <button className="px-8 py-4 bg-green-600 text-white font-semibold hover:bg-green-700 transition text-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          {/* Popular tags */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-red-500 font-semibold">Popular:</span>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">Jollof Rice</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">Suya</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">Nigerian</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">Continental</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">Seafood</button>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-red-500 font-semibold text-lg mb-2">Featured!</h2>
            <h3 className="text-3xl font-bold text-gray-900">Restaurants Near Me</h3>
          </div>
          <a href="#" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-medium">
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        <div className="overflow-x-auto" ref={carouselRef}>
          <div className="flex gap-6 pb-4" style={{width: 'max-content'}}>
          {/* Restaurant Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80" alt="Nigerian Jollof Rice" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">Close Now</span>
              <span className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">25% Off</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Best Nigerian Jollof In Lagos</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">★ 4.7</span>
                <span className="text-xs text-gray-500">• Victoria Island</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">NTDC</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">NAFDAC</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center text-green-600 text-sm">✓ Outdoor Dining</span>
                <span className="flex items-center text-green-600 text-sm">✓ Takeout</span>
                <span className="flex items-center text-green-600 text-sm">✓ Delivery</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Nigerian, Vegan, Continental</p>
              <button className="w-full py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition">View Details</button>
            </div>
          </div>

          {/* Restaurant Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
            <img src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80" alt="Nigerian Jollof Rice" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">Close Now</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Continental Favorite In Victoria</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">★ 4.7</span>
                <span className="text-xs text-gray-500">• Victoria Island</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">NTDC</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">NAFDAC</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center text-green-600 text-sm">✓ Outdoor Dining</span>
                <span className="flex items-center text-green-600 text-sm">✓ Takeout</span>
                <span className="flex items-center text-green-600 text-sm">✓ Delivery</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Nigerian, Vegan, Continental</p>
              <button className="w-full py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition">View Details</button>
            </div>
          </div>

          {/* Restaurant Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80" alt="Fast Food" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <span className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">20% Off</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">The Best Lagos Fast Food Chains</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">★ 4.7</span>
                <span className="text-xs text-gray-500">• Victoria Island</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">NTDC</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">NAFDAC</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center text-green-600 text-sm">✓ Outdoor Dining</span>
                <span className="flex items-center text-green-600 text-sm">✓ Takeout</span>
                <span className="flex items-center text-green-600 text-sm">✓ Delivery</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Nigerian, Vegan, Continental</p>
              <button className="w-full py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition">View Details</button>
            </div>
          </div>

          {/* Restaurant Card 4 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80" alt="Suya Spot" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <span className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">15% Off</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Famous Suya Spot Ikeja</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center text-green-600 text-sm">✓ Outdoor Dining</span>
                <span className="flex items-center text-green-600 text-sm">✓ Takeout</span>
                <span className="flex items-center text-red-500 text-sm">✗ Delivery</span>
              </div>
              <div className="text-red-500 text-sm mb-2">📞 +234 804 567 8901</div>
              <div className="text-red-500 text-sm mb-4">🌐 www.tastelagos.com</div>
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition text-sm font-semibold">More Details</button>
            </div>
          </div>

          {/* Restaurant Card 5 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Seafood Restaurant" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Premium Seafood Lekki</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center text-green-600 text-sm">✓ Outdoor Dining</span>
                <span className="flex items-center text-red-500 text-sm">✗ Takeout</span>
                <span className="flex items-center text-green-600 text-sm">✓ Delivery</span>
              </div>
              <div className="text-red-500 text-sm mb-2">📞 +234 805 678 9012</div>
              <div className="text-red-500 text-sm mb-4">🌐 www.tastelagos.com</div>
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition text-sm font-semibold">More Details</button>
            </div>
          </div>

          {/* Restaurant Card 6 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80" alt="Pizza Place" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">Close Now</span>
              <span className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">30% Off</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Authentic Italian Pizza Ikoyi</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center text-green-600 text-sm">✓ Outdoor Dining</span>
                <span className="flex items-center text-green-600 text-sm">✓ Takeout</span>
                <span className="flex items-center text-green-600 text-sm">✓ Delivery</span>
              </div>
              <div className="text-red-500 text-sm mb-2">📞 +234 806 789 0123</div>
              <div className="text-red-500 text-sm mb-4">🌐 www.tastelagos.com</div>
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition text-sm font-semibold">More Details</button>
            </div>
          </div>

          {/* Restaurant Card 7 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80" alt="Local Bukka" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Mama's Local Bukka Surulere</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center text-green-600 text-sm">✓ Outdoor Dining</span>
                <span className="flex items-center text-green-600 text-sm">✓ Takeout</span>
                <span className="flex items-center text-red-500 text-sm">✗ Delivery</span>
              </div>
              <div className="text-red-500 text-sm mb-2">📞 +234 807 890 1234</div>
              <div className="text-red-500 text-sm mb-4">🌐 www.tastelagos.com</div>
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition text-sm font-semibold">More Details</button>
            </div>
          </div>

          {/* Restaurant Card 8 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80" alt="Fine Dining" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Upscale Fine Dining VI</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center text-green-600 text-sm">✓ Outdoor Dining</span>
                <span className="flex items-center text-red-500 text-sm">✗ Takeout</span>
                <span className="flex items-center text-green-600 text-sm">✓ Delivery</span>
              </div>
              <div className="text-red-500 text-sm mb-2">📞 +234 808 901 2345</div>
              <div className="text-red-500 text-sm mb-4">🌐 www.tastelagos.com</div>
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition text-sm font-semibold">More Details</button>
            </div>
          </div>

          {/* Restaurant Card 9 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80" alt="Breakfast Spot" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <span className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">10% Off</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Morning Breakfast Cafe Yaba</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center text-green-600 text-sm">✓ Outdoor Dining</span>
                <span className="flex items-center text-green-600 text-sm">✓ Takeout</span>
                <span className="flex items-center text-green-600 text-sm">✓ Delivery</span>
              </div>
              <div className="text-red-500 text-sm mb-2">📞 +234 809 012 3456</div>
              <div className="text-red-500 text-sm mb-4">🌐 www.tastelagos.com</div>
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition text-sm font-semibold">More Details</button>
            </div>
          </div>

          {/* Restaurant Card 10 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80" alt="Vegan Restaurant" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">Close Now</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Green Vegan Kitchen Ajah</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center text-green-600 text-sm">✓ Outdoor Dining</span>
                <span className="flex items-center text-green-600 text-sm">✓ Takeout</span>
                <span className="flex items-center text-green-600 text-sm">✓ Delivery</span>
              </div>
              <div className="text-red-500 text-sm mb-2">📞 +234 810 123 4567</div>
              <div className="text-red-500 text-sm mb-4">🌐 www.tastelagos.com</div>
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition text-sm font-semibold">More Details</button>
            </div>
          </div>
          </div>
        </div>
      </section>

   {/* Top 10 Restaurants */}
   <section className="bg-gray-50 py-12 mt-12">
     <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-3xl font-bold text-gray-900">Top 10 Restaurants</h3>
          </div>
          <a href="#" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-medium">
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        <div className="overflow-x-auto" ref={carouselRef}>
          <div className="flex gap-6 pb-4" style={{width: 'max-content'}}>
          {/* Restaurant Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80" alt="Nigerian Jollof Rice" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">Close Now</span>
              <span className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">25% Off</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Best Nigerian Jollof In Lagos</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">★ 4.7</span>
                <span className="text-xs text-gray-500">• Victoria Island</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">NTDC</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">NAFDAC</span>
              </div>
            </div>
          </div>

          {/* Restaurant Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
            <img src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80" alt="Nigerian Jollof Rice" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">Close Now</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Continental Favorite In Victoria</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">★ 4.7</span>
                <span className="text-xs text-gray-500">• Victoria Island</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">NTDC</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">NAFDAC</span>
              </div>
            </div>
          </div>

          {/* Restaurant Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80" alt="Fast Food" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <span className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">20% Off</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">The Best Lagos Fast Food Chains</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">★ 4.7</span>
                <span className="text-xs text-gray-500">• Victoria Island</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">NTDC</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">NAFDAC</span>
              </div>
            </div>
          </div>

          {/* Restaurant Card 4 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80" alt="Suya Spot" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <span className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">15% Off</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Famous Suya Spot Ikeja</h4>
            </div>
          </div>

          {/* Restaurant Card 5 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Seafood Restaurant" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Premium Seafood Lekki</h4>
            </div>
          </div>

          {/* Restaurant Card 6 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80" alt="Pizza Place" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">Close Now</span>
              <span className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">30% Off</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Authentic Italian Pizza Ikoyi</h4>
            </div>
          </div>

          {/* Restaurant Card 7 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80" alt="Local Bukka" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Mama's Local Bukka Surulere</h4>
            </div>
          </div>

          {/* Restaurant Card 8 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80" alt="Fine Dining" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Upscale Fine Dining VI</h4>
            </div>
          </div>

          {/* Restaurant Card 9 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80" alt="Breakfast Spot" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">Open Now</span>
              <span className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">10% Off</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Morning Breakfast Cafe Yaba</h4>
            </div>
          </div>

          {/* Restaurant Card 10 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex-shrink-0 w-80">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80" alt="Vegan Restaurant" className="w-full h-48 object-cover" />
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">Close Now</span>
              <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&q=80" alt="Owner" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Green Vegan Kitchen Ajah</h4>
            </div>
          </div>
          </div>
        </div>
     </div>
   </section>

      {/* Meet the Community */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Meet the Community</h2>
            <a href="#" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-medium">
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4">
            {/* Navigation arrows */}
            <button className="flex-shrink-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex gap-4 overflow-x-auto flex-1">
              {/* Community Member 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-48 hover:shadow-lg transition cursor-pointer">
                <div className="h-32 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&h=128&q=80" 
                    alt="Community Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm">AdekunleOlumide</h3>
                  <p className="text-xs text-gray-500 mb-2">Lagos, Nigeria</p>
                  <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">Tasty Veg</span>
                </div>
              </div>

              {/* Community Member 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-48 hover:shadow-lg transition cursor-pointer">
                <div className="h-32 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=128&q=80" 
                    alt="Community Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm">ChefEmmanuel</h3>
                  <p className="text-xs text-gray-500 mb-2">Victoria Island, Lagos</p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Vegan</span>
                </div>
              </div>

              {/* Community Member 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-48 hover:shadow-lg transition cursor-pointer">
                <div className="h-32 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=128&q=80" 
                    alt="Community Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm">FunmiLagos</h3>
                  <p className="text-xs text-gray-500 mb-2">Lekki, Lagos</p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Vegan</span>
                </div>
              </div>

              {/* Community Member 4 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-48 hover:shadow-lg transition cursor-pointer">
                <div className="h-32 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=128&q=80" 
                    alt="Community Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm">TundeIkeja</h3>
                  <p className="text-xs text-gray-500 mb-2">Ikeja, Lagos</p>
                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">Vegetarian</span>
                </div>
              </div>

              {/* Community Member 5 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-48 hover:shadow-lg transition cursor-pointer">
                <div className="h-32 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=128&q=80" 
                    alt="Community Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm">BisiSurulere</h3>
                  <p className="text-xs text-gray-500 mb-2">Surulere, Lagos</p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Vegan</span>
                </div>
              </div>
            </div>
            
            <button className="flex-shrink-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Cities in Lagos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-red-500 font-semibold text-lg mb-2">Explore Top LGA</p>
            <h2 className="text-4xl font-bold text-gray-900">Inspiration for your Area Tour</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Victoria Island */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" 
                  alt="Agege Lagos" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Agege</h3>
                <p className="text-red-500 text-sm font-semibold">47 Listings</p>
              </div>
            </div>

            {/* Ikoyi */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=400&q=80" 
                  alt="Ajeromi-Ifelodun Lagos" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Ajeromi-Ifelodun</h3>
                <p className="text-red-500 text-sm font-semibold">32 Listings</p>
              </div>
            </div>

            {/* Lekki */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&q=80" 
                  alt="Alimosho Lagos" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Alimosho</h3>
                <p className="text-red-500 text-sm font-semibold">28 Listings</p>
              </div>
            </div>

            {/* Ikeja */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&w=400&q=80" 
                  alt="Amuwo-Odofin Lagos" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Amuwo-Odofin</h3>
                <p className="text-red-500 text-sm font-semibold">35 Listings</p>
              </div>
            </div>

            {/* Surulere */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400&q=80" 
                  alt="Surulere Lagos" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Surulere</h3>
                <p className="text-red-500 text-sm font-semibold">24 Listings</p>
              </div>
            </div>

            {/* Yaba */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=400&q=80" 
                  alt="Yaba Lagos" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Yaba</h3>
                <p className="text-red-500 text-sm font-semibold">19 Listings</p>
              </div>
            </div>

            {/* Ajah */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80" 
                  alt="Ajah Lagos" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Ajah</h3>
                <p className="text-red-500 text-sm font-semibold">15 Listings</p>
              </div>
            </div>

            {/* Maryland */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80" 
                  alt="Maryland Lagos" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Maryland</h3>
                <p className="text-red-500 text-sm font-semibold">22 Listings</p>
              </div>
            </div>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-green-500 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Subscribe Our Newsletter</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipiscing elit.<br />
            Tincidunt ut sem tempus molestie.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-900"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
            Subscribe
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-400 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-600 rounded-full opacity-20 translate-x-24 translate-y-24"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-green-400 rounded-full opacity-25"></div>
      </section>

      {/* Restaurant Listings */}
      {/* <main className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1,2,3,4,5,6].map((id) => (
          <div key={id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col">
            <div className="h-48 w-full bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-5xl">🍽️</span>
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
      </main> */}

      {/* Footer */}
      <footer className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* TasteLagos Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41-6.88-6.88 1.37-1.37z"/>
                    <circle cx="12" cy="12" r="1.5"/>
                  </svg>
                </div>
                <span className="text-xl font-bold">
                  <span className="text-green-600">Taste</span>
                  <span className="text-orange-500">Lagos</span>
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Discover the best restaurants, street food spots, and hidden gems in Lagos. Your go-to guide for where to eat and what to try in the city.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white hover:bg-blue-700 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white hover:bg-blue-600 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center text-white hover:bg-pink-600 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600 transition">Home One</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Listings</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Listing Form</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Blog</a></li>
              </ul>
            </div>

            {/* Informations */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Informations</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600 transition">Listings</a></li>
                <li><a href="#" className="hover:text-green-600 transition">My Account</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Listing Form</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Checkout</a></li>
              </ul>
            </div>

            {/* Download App */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Download App</h3>
              <div className="space-y-3">
                <a href="#" className="block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10" />
                </a>
                <a href="#" className="block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-10" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
              <span>&copy; 2025 TasteLagos. All rights reserved.</span>
              <div className="flex gap-4 mt-2 md:mt-0">
                <a href="#" className="hover:text-green-600 transition">Privacy Policy</a>
                <a href="#" className="hover:text-green-600 transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
