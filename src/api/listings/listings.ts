import { apiClient } from '@/api/config/axios';
import { Listing, ListingsResponse } from '@/types/listing';

export const listingsApi = {
  getListings: async (params?: {
    page?: number;
    per_page?: number;
    category?: string;
    listing_type?: 'stay' | 'experience';
    property_type?: string;
    search?: string;
    authenticated?: boolean;
  }): Promise<ListingsResponse> => {
    try {
      const endpoint = params?.authenticated ? '/listings/authenticated' : '/listings';
      const response = await apiClient.get<ListingsResponse>(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getListingById: async (id: number): Promise<Listing> => {
    try {
      const response = await apiClient.get<Listing>(`/listings/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getListingsByCategory: async (category: string, authenticated?: boolean): Promise<ListingsResponse> => {
    try {
      const endpoint = authenticated ? `/listings/category/${category}/authenticated` : `/listings/category/${category}`;
      const response = await apiClient.get<ListingsResponse>(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFavoriteListings: async (): Promise<ListingsResponse> => {
    try {
      const response = await apiClient.get<ListingsResponse>('/listings/favorites');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  toggleFavorite: async (listingId: number): Promise<{ is_favorite: boolean }> => {
    try {
      const response = await apiClient.post<{ is_favorite: boolean }>(`/listings/${listingId}/favorite`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 