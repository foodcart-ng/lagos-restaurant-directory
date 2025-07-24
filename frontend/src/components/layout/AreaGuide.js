'use client'

import Link from 'next/link'
import Image from 'next/image'

const areas = [
  {
    name: 'Victoria Island',
    description: 'Business district with upscale dining and international cuisine',
    restaurantCount: 450,
    image: '/areas/victoria-island.jpg',
    slug: 'victoria-island',
    highlights: ['Fine dining', 'International cuisine', 'Business lunches']
  },
  {
    name: 'Lekki',
    description: 'Modern residential area with diverse restaurants and nightlife',
    restaurantCount: 320,
    image: '/areas/lekki.jpg',
    slug: 'lekki',
    highlights: ['Family dining', 'Nightlife', 'Modern cuisine']
  },
  {
    name: 'Ikoyi',
    description: 'Upscale neighborhood known for premium restaurants',
    restaurantCount: 180,
    image: '/areas/ikoyi.jpg',
    slug: 'ikoyi',
    highlights: ['Premium dining', 'Quiet atmosphere', 'Fine wine']
  },
  {
    name: 'Surulere',
    description: 'Traditional area with authentic Nigerian cuisine and street food',
    restaurantCount: 280,
    image: '/areas/surulere.jpg',
    slug: 'surulere',
    highlights: ['Local cuisine', 'Street food', 'Affordable prices']
  },
  {
    name: 'Ikeja',
    description: 'Commercial hub with mix of local and international restaurants',
    restaurantCount: 340,
    image: '/areas/ikeja.jpg',
    slug: 'ikeja',
    highlights: ['Airport dining', 'Quick meals', 'Business meetings']
  },
  {
    name: 'Yaba',
    description: 'Tech hub with trendy cafes and modern dining spots',
    restaurantCount: 190,
    image: '/areas/yaba.jpg',
    slug: 'yaba',
    highlights: ['Tech cafes', 'Young crowd', 'Innovative cuisine']
  },
]

export default function AreaGuide() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Lagos by Area
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each area of Lagos has its unique dining culture. Discover the best restaurants 
            in your neighborhood or explore new culinary territories.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/area/${area.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                {/* Area Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay with restaurant count */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-full">
                      {area.restaurantCount} restaurants
                    </span>
                  </div>
                </div>

                {/* Area Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {area.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {area.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find your area?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're constantly expanding our coverage across Lagos. 
              Let us know if you'd like us to feature restaurants in your neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/suggest-area"
                className="btn-primary"
              >
                Suggest an Area
              </Link>
              <Link
                href="/add-restaurant"
                className="btn-secondary"
              >
                Add Your Restaurant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}