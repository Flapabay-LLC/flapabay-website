import { useState, useEffect } from 'react';
import { ListingsService } from '@/services/listingsService';
import { Listing, ListingsResponse } from '@/types/listing';
import { useAuth } from '@/hooks/useAuth'; // Assuming you have an auth hook

interface UseListingsProps {
  category?: string;
  listingType?: 'stay' | 'experience';
  propertyType?: string;
  searchQuery?: string;
  initialPage?: number;
  perPage?: number;
  authenticated?: boolean;
}

export const useListings = ({ 
  category, 
  listingType,
  propertyType,
  searchQuery,
  initialPage = 1, 
  perPage = 10,
  authenticated = false 
}: UseListingsProps = {}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const { isAuthenticated } = useAuth(); // Get auth state

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Only use authenticated endpoints if user is authenticated and authenticated flag is true
      const shouldUseAuthenticated = isAuthenticated && authenticated;
      
      const response = category
        ? await ListingsService.getListingsByCategory(category, shouldUseAuthenticated)
        : await ListingsService.getListings({ 
            page, 
            per_page: perPage,
            listing_type: listingType,
            property_type: propertyType,
            search: searchQuery,
            authenticated: shouldUseAuthenticated 
          });

      // Only apply client-side filtering for property type if needed
      let filteredListings = response.data;
      
      if (propertyType) {
        filteredListings = filteredListings.filter(listing => 
          listing.property_type?.name.toLowerCase() === propertyType.toLowerCase()
        );
      }

      setListings(filteredListings);
      if (response.meta) {
        setTotalPages(response.meta.total_pages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [category, listingType, propertyType, searchQuery, page, perPage, authenticated, isAuthenticated]);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const toggleFavorite = async (listingId: number) => {
    try {
      if (!isAuthenticated) {
        throw new Error('You must be logged in to favorite listings');
      }

      const result = await ListingsService.toggleFavorite(listingId);
      
      // Update the listing in the local state
      setListings(prevListings => 
        prevListings.map(listing => 
          listing.id === listingId 
            ? { ...listing, is_favorite: result.is_favorite }
            : listing
        )
      );

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error toggling favorite');
      throw err;
    }
  };

  return {
    listings,
    loading,
    error,
    page,
    totalPages,
    nextPage,
    prevPage,
    toggleFavorite,
    refetch: fetchListings
  };
}; 