'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Discover', href: '/discover' },
    { name: 'Areas', href: '/areas' },
    { name: 'Cuisines', href: '/cuisines' },
    { name: 'Reviews', href: '/reviews' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <nav className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-lg">
                📍
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-gray-900">
                  Lagos Eats
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  Restaurant Directory
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
              🔍
            </button>
            <Link
              href="/add-restaurant"
              className="btn-primary text-sm"
            >
              Add Restaurant
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
            <div className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-base font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <Link
                  href="/add-restaurant"
                  className="block w-full btn-primary text-center text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Restaurant
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}