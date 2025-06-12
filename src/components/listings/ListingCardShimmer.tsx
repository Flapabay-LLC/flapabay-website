import React from 'react';

const ListingCardShimmer: React.FC = () => {
  return (
    <div className="listing-card bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Shimmer */}
      <div className="relative w-full h-40 bg-gray-300 rounded-t-lg">
        {/* Placeholder for featured badge */}
        <div className="absolute top-4 left-4 h-6 w-20 bg-gray-400 rounded-full"></div>
        {/* Placeholder for heart icon */}
        <div className="absolute top-4 right-4 h-6 w-6 bg-gray-400 rounded-full"></div>
        {/* Placeholder for dots */}
        
      </div>

      {/* Content Shimmer */}
      <div className="p-4">
        {/* Title Shimmer */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-1"></div>
        {/* Price Shimmer */}
        <div className="h-5 bg-gray-300 rounded w-1/2 mb-3"></div>

        {/* Bottom Info Shimmer */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-10"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCardShimmer; 