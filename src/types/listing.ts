export interface Host {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user_id: number;
  listing_id: number;
  created_at: string;
}

export interface PropertyType {
  id: number;
  name: string;
  black_icon: string;
  white_icon: string;
  description: string;
  bg_color: string;
  color: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  price: string;
  price_per_night: string;
  additional_guest_price: string;
  children_price: string;
  currency: string;
  original_prices: {
    price: string;
    price_per_night: string;
    additional_guest_price: string;
    children_price: string;
    currency: string;
  };
  maximum_guests: number;
  rating: number | null;
  verified: number;
  is_favorite: boolean;
  images: Array<{
    url: string;
    is_primary: number;
  }>;
  amenities: string[];
  property_type: PropertyType;
  listing_type: 'stay' | 'experience';
  host: Host;
  reviews: Review[];
  created_at: string;
  updated_at: string;
}

export interface ListingsResponse {
  data: Listing[];
  meta?: {
    current_page: number;
    total_pages: number;
    total_items: number;
  };
} 