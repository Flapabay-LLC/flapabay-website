// Common response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: {
    current_page: number;
    total_pages: number;
    total_items: number;
    items_per_page: number;
  };
}

// Authentication
export interface LoginRequest {
  email?: string;
  phone?: string;
  password?: string;
}

export interface RegisterRequest {
  name: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface VerifyOtpRequest {
  email?: string;
  phone?: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
  status?: boolean;
}

export interface User {
  id: number;
  host_id: number | null;
  fname: string | null;
  lname: string | null;
  email: string;
  phone: string;
  currency: string;
  current_team_id: number | null;
  details: any | null;
  email_verified_at: string | null;
  facebook_id: string | null;
  google_id: string | null;
  profile_photo_path: string | null;
  profile_photo_url: string;
  two_factor_confirmed_at: string | null;
  otp?: string;
  otp_expires_at?: string;
  otp_verified_at?: string;
  created_at: string;
  updated_at: string;
}

// User
export interface UserUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  preferences?: Record<string, any>;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'guest' | 'host';
  avatar?: string;
  preferences?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Property
export interface PropertyRequest {
  title: string;
  description: string;
  price: number;
  location_id: number;
  property_type_id: number;
  category_id: number;
  amenities?: string[];
  images?: string[];
  rules?: string[];
  availability?: {
    start_date: string;
    end_date: string;
  }[];
}

export interface PropertyResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  location: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  property_type: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  amenities: string[];
  images: string[];
  rules: string[];
  availability: {
    start_date: string;
    end_date: string;
  }[];
  host: UserResponse;
  created_at: string;
  updated_at: string;
}

// Booking
export interface BookingRequest {
  property_id: number;
  start_date: string;
  end_date: string;
  guest_count: number;
  special_requests?: string;
}

export interface BookingResponse {
  id: number;
  property: PropertyResponse;
  guest: UserResponse;
  start_date: string;
  end_date: string;
  guest_count: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  special_requests?: string;
  created_at: string;
  updated_at: string;
}

// Payment
export interface PaymentRequest {
  booking_id: number;
  amount: number;
  payment_method: 'card' | 'bank_transfer' | 'paypal';
  payment_details: Record<string, any>;
}

export interface PaymentResponse {
  id: number;
  booking_id: number;
  amount: number;
  payment_method: 'card' | 'bank_transfer' | 'paypal';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

// OTP Authentication Types
export interface OtpRequest {
  email?: string;
  phone?: string;
  code?: string;
}

export interface OtpResponse {
  message: string;
  messageId: string;
}

export interface LoginWithOtpRequest {
  email?: string;
  phone?: string;
  otp: string;
  code?: string;
}

// Signup Types
export interface SignupOtpRequest {
  email?: string;
  phone?: string;
  code?: string;
}

export interface RegisterUserDetailsRequest {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
}