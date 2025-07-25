import Link from 'next/link'

export default function TasteLagosLogo({ size = 'default', className = '' }) {
  // Size variants
  const sizeClasses = {
    small: {
      text: 'text-base md:text-lg',
      icon: 'w-5 h-5 md:w-6 md:h-6',
      svg: 'w-2.5 h-2.5 md:w-3.5 md:h-3.5'
    },
    default: {
      text: 'text-lg md:text-xl',
      icon: 'w-6 h-6 md:w-8 md:h-8',
      svg: 'w-3 h-3 md:w-5 md:h-5'
    },
    large: {
      text: 'text-xl md:text-2xl',
      icon: 'w-8 h-8 md:w-10 md:h-10',
      svg: 'w-4 h-4 md:w-6 md:h-6'
    }
  }

  const sizes = sizeClasses[size] || sizeClasses.default

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <span className={`${sizes.text} font-bold text-green-600`}>Taste</span>
      <div className={`${sizes.icon} bg-green-600 rounded-full flex items-center justify-center mx-1`}>
        <svg className={`${sizes.svg} text-white`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41-6.88-6.88 1.37-1.37z"/>
          <circle cx="12" cy="12" r="1.5"/>
        </svg>
      </div>
      <span className={`${sizes.text} font-bold text-orange-500`}>Lagos</span>
    </Link>
  )
}