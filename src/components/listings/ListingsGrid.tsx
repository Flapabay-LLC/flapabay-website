import React from 'react';
import { useListings } from '@/hooks/useListings';
import ListingCard from './ListingCard';
import ListingCardShimmer from './ListingCardShimmer';
import { useAuth } from '@/hooks/useAuth';

interface ListingsGridProps {
  category?: string;
  listingType?: 'stay' | 'experience';
  propertyType?: string;
  searchQuery?: string;
}

const ListingsGrid: React.FC<ListingsGridProps> = ({ 
  category, 
  listingType, 
  propertyType,
  searchQuery 
}) => {
  const { listings, loading, error, page, totalPages, nextPage, prevPage, toggleFavorite } = useListings({
    category,
    listingType,
    propertyType,
    searchQuery,
    initialPage: 1,
    perPage: 12
  });
  const { isAuthenticated } = useAuth();

  const handleFavoriteToggle = async (listingId: number) => {
    if (!isAuthenticated) {
      // You might want to show a login prompt or redirect to login
      return;
    }
    await toggleFavorite(listingId);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <ListingCardShimmer key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error loading listings: {error}</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        <p>No listings found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {listings.map((listing) => (
          <ListingCard 
            key={listing.id} 
            listing={listing} 
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingsGrid; 