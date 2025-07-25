import Link from 'next/link'
import TasteLagosLogo from '../ui/TasteLagosLogo'

export default function TasteLagosFooter() {
  return (
    <footer className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* TasteLagos Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <TasteLagosLogo />
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Discover the best restaurants, street food spots, and hidden gems in Lagos. Your go-to guide for where to eat and what to try in the city.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white hover:bg-blue-700 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white hover:bg-blue-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center text-white hover:bg-pink-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 2.011c2.721 0 3.044.012 4.117.059 1.684.077 2.597.343 3.203.572.805.313 1.38.687 1.984 1.291.604.604.978 1.179 1.291 1.984.229.606.495 1.519.572 3.203.047 1.073.059 1.396.059 4.117s-.012 3.044-.059 4.117c-.077 1.684-.343 2.597-.572 3.203-.313.805-.687 1.38-1.291 1.984-.604.604-1.179.978-1.984 1.291-.606.229-1.519.495-3.203.572-1.073.047-1.396.059-4.117.059s-3.044-.012-4.117-.059c-1.684-.077-2.597-.343-3.203-.572-.805-.313-1.38-.687-1.984-1.291-.604-.604-.978-1.179-1.291-1.984-.229-.606-.495-1.519-.572-3.203-.047-1.073-.059-1.396-.059-4.117s.012-3.044.059-4.117c.077-1.684.343-2.597.572-3.203.313-.805.687-1.38 1.291-1.984.604-.604 1.179-.978 1.984-1.291.606-.229 1.519-.495 3.203-.572 1.073-.047 1.396-.059 4.117-.059zm0-2.011c-2.767 0-3.114.013-4.201.061-1.081.049-1.82.221-2.465.473-.675.263-1.248.614-1.818 1.184-.57.57-.921 1.143-1.184 1.818-.252.645-.424 1.384-.473 2.465-.048 1.087-.061 1.434-.061 4.201s.013 3.114.061 4.201c.049 1.081.221 1.82.473 2.465.263.675.614 1.248 1.184 1.818.57.57 1.143.921 1.818 1.184.645.252 1.384.424 2.465.473 1.087.048 1.434.061 4.201.061s3.114-.013 4.201-.061c1.081-.049 1.82-.221 2.465-.473.675-.263 1.248-.614 1.818-1.184.57-.57.921-1.143 1.184-1.818.252-.645.424-1.384.473-2.465.048-1.087.061-1.434.061-4.201s-.013-3.114-.061-4.201c-.049-1.081-.221-1.82-.473-2.465-.263-.675-.614-1.248-1.184-1.818-.57-.57-1.143-.921-1.818-1.184-.645-.252-1.384-.424-2.465-.473-1.087-.048-1.434-.061-4.201-.061zm0 5.421c-2.874 0-5.204 2.33-5.204 5.204s2.33 5.204 5.204 5.204 5.204-2.33 5.204-5.204-2.33-5.204-5.204-5.204zm0 8.588c-1.868 0-3.384-1.516-3.384-3.384s1.516-3.384 3.384-3.384 3.384 1.516 3.384 3.384-1.516 3.384-3.384 3.384zm6.634-8.854c0-.671-.544-1.215-1.215-1.215s-1.215.544-1.215 1.215.544 1.215 1.215 1.215 1.215-.544 1.215-1.215z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Community Links */}
          <div className="md:mt-0 mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/profile" className="hover:text-green-600 transition">My Profile</Link></li>
              <li><Link href="/newsletter" className="hover:text-green-600 transition">Newsletter</Link></li>
              <li><Link href="/blog" className="hover:text-green-600 transition">Blog</Link></li>
              <li><Link href="/about-us" className="hover:text-green-600 transition">About Us</Link></li>
            </ul>
          </div>

          {/* Informations */}
          <div className="md:mt-0 mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/faq" className="hover:text-green-600 transition">Faq</Link></li>
              <li><Link href="/contact" className="hover:text-green-600 transition">Contact</Link></li>
              <li><Link href="/banners" className="hover:text-green-600 transition">Link to us</Link></li>
              <li><Link href="/sitemap" className="hover:text-green-600 transition">Sitemap</Link></li>
            </ul>
          </div>

          {/* Download App */}
          <div className="md:mt-0 mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Download App</h3>
            <div className="space-y-3">
              <Link href="#" className="block">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play" 
                  className="h-10 w-auto"
                />
              </Link>
              <Link href="#" className="block">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="Download on the App Store" 
                  className="h-10 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-200 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
            <span className="text-center md:text-left">&copy; 2025 TasteLagos. All rights reserved.</span>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link href="/privacy" className="hover:text-green-600 transition">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-green-600 transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}