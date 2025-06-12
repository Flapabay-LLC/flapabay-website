import { Listing } from '@/types/listing';

export const validateListing = (listing: Partial<Listing>): string[] => {
  const errors: string[] = [];

  if (!listing.title) {
    errors.push('Title is required');
  }

  if (!listing.location) {
    errors.push('Location is required');
  }

  if (!listing.price) {
    errors.push('Price is required');
  } else if (isNaN(parseFloat(listing.price))) {
    errors.push('Price must be a valid number');
  }

  if (!listing.currency) {
    errors.push('Currency is required');
  }

  if (listing.maximum_guests && (isNaN(listing.maximum_guests) || listing.maximum_guests < 1)) {
    errors.push('Maximum guests must be a positive number');
  }

  if (listing.rating && (isNaN(parseFloat(listing.rating)) || parseFloat(listing.rating) < 0 || parseFloat(listing.rating) > 5)) {
    errors.push('Rating must be a number between 0 and 5');
  }

  return errors;
};

export const validateListingSearchParams = (params: {
  page?: number;
  per_page?: number;
  category?: string;
  listing_type?: 'stay' | 'experience';
  property_type?: string;
  search?: string;
}): string[] => {
  const errors: string[] = [];

  if (params.page && (isNaN(params.page) || params.page < 1)) {
    errors.push('Page must be a positive number');
  }

  if (params.per_page && (isNaN(params.per_page) || params.per_page < 1 || params.per_page > 100)) {
    errors.push('Items per page must be between 1 and 100');
  }

  if (params.listing_type && !['stay', 'experience'].includes(params.listing_type)) {
    errors.push('Listing type must be either "stay" or "experience"');
  }

  return errors;
}; 