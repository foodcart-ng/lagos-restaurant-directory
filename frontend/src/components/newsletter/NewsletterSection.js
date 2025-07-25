'use client'

import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setError('')

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubscribed(true)
      setEmail('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    {
      icon: '🍽️',
      title: 'Weekly Restaurant Picks',
      description: 'Curated selections of the best new restaurants and hidden gems in Lagos'
    },
    {
      icon: '💰',
      title: 'Exclusive Deals',
      description: 'Special discounts and offers from partner restaurants just for subscribers'
    },
    {
      icon: '🎉',
      title: 'Food Events',
      description: 'First access to food festivals, pop-ups, and culinary events across the city'
    },
    {
      icon: '👨‍🍳',
      title: 'Chef Interviews',
      description: 'Behind-the-scenes stories and recipes from Lagos\' most talented chefs'
    }
  ]

  if (isSubscribed) {
    return (
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Welcome to the Foodie Family! 🎉
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You're now subscribed to Lagos' best food newsletter. Get ready for weekly doses of 
              delicious discoveries, exclusive deals, and insider food tips straight to your inbox!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span>📧</span> Weekly newsletters
              </span>
              <span className="flex items-center gap-1">
                <span>🔒</span> No spam, unsubscribe anytime
              </span>
              <span className="flex items-center gap-1">
                <span>🍛</span> Lagos food exclusive
              </span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Column - Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📧</span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Taste Lagos Weekly
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8">
                Join over <span className="font-bold text-orange-600">15,000+ food lovers</span> who 
                never miss out on Lagos' best dining experiences. Get insider access to new restaurant 
                openings, exclusive deals, and food events delivered straight to your inbox.
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                      required
                      disabled={isLoading}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Subscribing...
                      </div>
                    ) : (
                      'Subscribe Free'
                    )}
                  </button>
                </div>
              </form>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <span>✅</span> Free forever
                </span>
                <span className="flex items-center gap-1">
                  <span>🔒</span> No spam, unsubscribe anytime
                </span>
                <span className="flex items-center gap-1">
                  <span>📱</span> Mobile-friendly
                </span>
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="bg-gray-50 p-8 md:p-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                What you'll get every week:
              </h3>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {String.fromCharCode(65 + i - 1)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    15,000+ subscribers
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>⭐</span>
                    ))}
                  </div>
                  <span className="ml-2">
                    "Best food newsletter in Lagos!" - <span className="font-medium">Adunni O.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA for Mobile */}
        <div className="mt-8 text-center md:hidden">
          <p className="text-sm text-gray-500 mb-4">
            Join thousands of Lagos food lovers
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-400">
            <span>🍛 Nigerian cuisine focus</span>
            <span>📍 Lagos exclusive</span>
            <span>👨‍🍳 Chef insights</span>
          </div>
        </div>
      </div>
    </section>
  )
}