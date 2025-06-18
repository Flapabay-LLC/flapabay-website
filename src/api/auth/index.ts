import { apiClient } from '../config/axios';
import {
  AuthUser,
  Session,
  SessionResponse,
  UserResponse,
  OAuthResponse,
  LoginRequest,
  RegisterRequest,
  OAuthRequest,
  OtpRequest,
  VerifyOtpRequest,
  UpdateUserRequest
} from './types';

export const authApi = {
  /**
   * Sign in with email and password
   */
  signInWithPassword: async (credentials: LoginRequest): Promise<SessionResponse> => {
    return apiClient.post<SessionResponse>('/login', credentials);
  },

  /**
   * Register new user
   */
  signUp: async (credentials: RegisterRequest): Promise<SessionResponse> => {
    return apiClient.post<SessionResponse>('/register', credentials);
  },

  /**
   * Sign in with OAuth provider
   */
  signInWithOAuth: async (options: OAuthRequest): Promise<OAuthResponse | SessionResponse> => {
    return apiClient.post<OAuthResponse | SessionResponse>('/oauth', options);
  },

  /**
   * Sign in with OTP
   */
  signInWithOtp: async (options: OtpRequest): Promise<SessionResponse> => {
    return apiClient.post<SessionResponse>('/otp', options);
  },

  /**
   * Verify OTP
   */
  verifyOtp: async (options: VerifyOtpRequest): Promise<SessionResponse> => {
    return apiClient.post<SessionResponse>('/verify-otp', options);
  },

  /**
   * Sign out
   */
  signOut: async (): Promise<void> => {
    localStorage.removeItem('token');
    return apiClient.post('/logout');
  },

  /**
   * Get current user
   */
  getUser: async (): Promise<UserResponse> => {
    return apiClient.get<UserResponse>('/user');
  },

  /**
   * Get current session
   */
  getSession: async (): Promise<SessionResponse> => {
    return apiClient.get<SessionResponse>('/session');
  },

  /**
   * Update user
   */
  updateUser: async (attributes: UpdateUserRequest): Promise<UserResponse> => {
    return apiClient.put<UserResponse>('/user', attributes);
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string): Promise<void> => {
    return apiClient.post('/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    return apiClient.post('/reset-password', { token, newPassword });
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (token: string): Promise<void> => {
    return apiClient.post('/verify-email', { token });
  }
}; 