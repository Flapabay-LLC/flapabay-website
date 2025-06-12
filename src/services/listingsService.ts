import { listingsApi } from '@/api/listings/listings';
import { Listing, ListingsResponse } from '@/types/listing';
import { validateListing, validateListingSearchParams } from '@/utils/validators/listingValidator';
// import { ApiError } from '@/api/types';

export class ListingsService {
  static async getListings(params?: {
    page?: number;
    per_page?: number;
    category?: string;
    listing_type?: 'stay' | 'experience';
    property_type?: string;
    search?: string;
    authenticated?: boolean;
  }): Promise<ListingsResponse> {
    try {
      // Validate search parameters
      const validationErrors = validateListingSearchParams(params || {});
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      return await listingsApi.getListings(params);
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  }

  static async getListingsByCategory(category: string, authenticated?: boolean): Promise<ListingsResponse> {
    try {
      if (!category) {
        throw new Error('Category is required');
      }

      return await listingsApi.getListingsByCategory(category, authenticated);
    } catch (error) {
      console.error(`Error fetching listings for category ${category}:`, error);
      throw error;
    }
  }

  static async getFavoriteListings(): Promise<ListingsResponse> {
    try {
      return await listingsApi.getFavoriteListings();
    } catch (error) {
      console.error('Error fetching favorite listings:', error);
      throw error;
    }
  }

  static async toggleFavorite(listingId: number): Promise<{ is_favorite: boolean }> {
    try {
      if (!listingId) {
        throw new Error('Listing ID is required');
      }

      return await listingsApi.toggleFavorite(listingId);
    } catch (error) {
      console.error(`Error toggling favorite for listing ${listingId}:`, error);
      throw error;
    }
  }

  static formatPrice(price: string | number, currency: string): string {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numPrice);
  }

  static getListingTypeIcon(listingType: string): string {
    const iconMap: { [key: string]: string } = {
      'Experiences': 'experience',
      'Homes': 'home',
      'Hotels': 'hotel',
      'Restaurants': 'restaurant',
      // Add more mappings as needed
    };
    return iconMap[listingType] || 'default';
  }

  static validateListingData(listing: Partial<Listing>): string[] {
    return validateListing(listing);
  }
} 