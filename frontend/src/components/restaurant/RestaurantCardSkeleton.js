export default function RestaurantCardSkeleton({ viewMode = 'grid' }) {
  if (viewMode === 'list') {
    return (
      <div className="card flex gap-4 p-4 animate-pulse">
        <div className="w-32 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="skeleton-title"></div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="w-8 h-4 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="w-8 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="flex space-x-2">
            <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[4/3] bg-gray-200 rounded-t-xl"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="skeleton-title"></div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
          <div className="w-12 h-4 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
        
        <div className="flex space-x-2">
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}