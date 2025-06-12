import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { secureStorage } from '@/utils/secureStorage';

const isDevelopment = import.meta.env.DEV;
const baseURL = isDevelopment
  ? '/api/v1'  // Use proxy in development
  : (import.meta.env.VITE_API_BASE_URL || 'https://api.flapabay.com/api/v1');

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
      },
      timeout: 30000, // 30 seconds
    });

    // Add request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = secureStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // If the request data is FormData, don't set Content-Type
        if (config.data instanceof FormData) {
          delete config.headers['Content-Type'];
        } else {
          config.headers['Content-Type'] = 'application/json';
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If token refresh is in progress, wait for it
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.axiosInstance(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = secureStorage.getItem('refresh_token');
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            const response = await this.axiosInstance.post('/refresh-token', {
              refreshToken
            });

            const { token } = response.data;
            secureStorage.setItem('auth_token', token);

            // Retry all queued requests
            this.refreshSubscribers.forEach(callback => callback(token));
            this.refreshSubscribers = [];

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // If refresh fails, clear tokens and redirect to login
            secureStorage.removeItem('auth_token');
            secureStorage.removeItem('refresh_token');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response;
  }
}

export const apiClient = ApiClient.getInstance();