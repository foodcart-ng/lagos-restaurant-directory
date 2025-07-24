import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerNavigation = {
    discover: [
      { name: 'All Restaurants', href: '/discover' },
      { name: 'By Area', href: '/areas' },
      { name: 'By Cuisine', href: '/cuisines' },
      { name: 'Top Rated', href: '/top-rated' },
      { name: 'New Restaurants', href: '/new' },
    ],
    forRestaurants: [
      { name: 'Add Your Restaurant', href: '/add-restaurant' },
      { name: 'Business Dashboard', href: '/business' },
      { name: 'Advertising', href: '/advertising' },
      { name: 'Partner with Us', href: '/partner' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  }

  const socialLinks = [
    {
      name: 'Twitter',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348V9.362c0-1.297 1.051-2.348 2.348-2.348h7.102c1.297 0 2.348 1.051 2.348 2.348v5.277c0 1.297-1.051 2.348-2.348 2.348H8.449z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-lg">
                  📍
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg text-white">
                    Lagos Eats
                  </span>
                  <span className="text-xs text-gray-400 -mt-1">
                    Restaurant Directory
                  </span>
                </div>
              </Link>
              
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Discover the best restaurants, cafes, and dining experiences in Lagos, Nigeria. 
                Your guide to authentic flavors and memorable meals.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Discover */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Discover
                </h3>
                <ul className="space-y-3">
                  {footerNavigation.discover.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Restaurants */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  For Restaurants
                </h3>
                <ul className="space-y-3">
                  {footerNavigation.forRestaurants.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Company
                </h3>
                <ul className="space-y-3">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Support
                </h3>
                <ul className="space-y-3">
                  {footerNavigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-lg font-semibold text-white mb-2">
                Stay updated with Lagos' dining scene
              </h3>
              <p className="text-gray-400 text-sm">
                Get the latest restaurant openings, reviews, and food events delivered to your inbox.
              </p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-3 lg:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} Lagos Restaurant Directory. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-400">Made with ❤️ in Lagos</span>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-400">Powered by</span>
                <span className="text-sm font-medium text-nigeria-400">FoodCart NG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}