'use client'

import { useState } from 'react'
import Link from 'next/link'
import TasteLagosLogo from '../ui/TasteLagosLogo'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { 
      name: 'Explore', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Restaurants Nearby', href: '/nearby' },
        { name: 'Top Rated', href: '/top-rated' },
        { name: 'Street Food Spots', href: '/street-food' },
        { name: 'Add a Listing', href: '/add-listing' },
        { name: 'Write Review', href: '/write-review' }
      ]
    },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'About Us', href: '/about' },
  ]

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <TasteLagosLogo />

          {/* Desktop Navigation Menu - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            {navigation.map((item) => (
              item.hasDropdown ? (
                <div key={item.name} className="relative group">
                  <a href="#" className="hover:text-green-500 transition flex items-center gap-1">
                    {item.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <div key={dropdownItem.name}>
                          <Link
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                          >
                            {dropdownItem.name}
                          </Link>
                          {(index === 2 || index === 4) && <div className="border-t border-gray-100 my-1"></div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-green-500 transition"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop Right Side Actions - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="flex items-center gap-1 text-gray-700 hover:text-green-500 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login/ Sign up
            </Link>
            <button className="px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition flex items-center gap-2">
              Add Listing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Mobile menu button - Visible only on mobile */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 md:px-6 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div className="space-y-2">
                      <div className="font-medium text-gray-900 pb-2 border-b border-gray-100">
                        {item.name}
                      </div>
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block pl-4 py-2 text-sm text-gray-600 hover:text-green-600 transition"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-2 text-base font-medium text-gray-900 hover:text-green-600 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Actions */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link 
                  href="#" 
                  className="flex items-center gap-2 py-2 text-gray-700 hover:text-green-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Login / Sign up
                </Link>
                <button 
                  className="w-full px-4 py-3 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Listing
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}