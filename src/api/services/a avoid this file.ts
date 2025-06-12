import { apiClient } from '../config/axios';
import { withTryCatch } from '../core/withTryCatch';
import { 
  LoginRequest, 
  RegisterRequest, 
  VerifyOtpRequest,
  AuthResponse,
  UserResponse,
  OtpRequest,
  OtpResponse,
  LoginWithOtpRequest,
  SignupOtpRequest,
  RegisterUserDetailsRequest
} from '../types/apiTypes';

export const authService = {
  // Regular authentication
  login: withTryCatch(async (data: LoginRequest) => 
    apiClient.post<AuthResponse>('/login', data)
  ),
  
  register: withTryCatch(async (data: RegisterRequest) => 
    apiClient.post<AuthResponse>('/register', data)
  ),

  // Google OAuth
  googleAuth: withTryCatch(async (googleToken: string, userInfo: any) => 
    apiClient.post<AuthResponse>('/google-auth', { googleToken, userInfo })
  ),

  // OTP verification
  getEmailOtp: withTryCatch(async (email: string) => 
    apiClient.post<OtpResponse>('/get-email-otp', { email })
  ),
  
  getPhoneOtp: withTryCatch(async (phone: string) => 
    apiClient.post<OtpResponse>('/get-phone-otp', { phone })
  ),
  
  verifyOtp: withTryCatch(async (data: VerifyOtpRequest) => 
    apiClient.post<AuthResponse>('/verify-otp', data)
  ),

  // Password management
  forgotPassword: withTryCatch(async (email: string) => 
    apiClient.post<{ message: string }>('/forgot-password', { email })
  ),
  
  resetPassword: withTryCatch(async (data: { token: string; password: string }) => 
    apiClient.post<{ message: string }>('/reset-password', data)
  ),

  // Session management
  logout: withTryCatch(async () => 
    apiClient.post<{ message: string }>('/logout')
  ),

  // User management
  updateUser: withTryCatch(async (data: Partial<UserResponse>) => 
    apiClient.put<{ user: UserResponse }>('/user', data)
  ),

  // Role management
  switchRole: withTryCatch(async (role: 'guest' | 'host') => 
    apiClient.put<{ user: UserResponse }>('/user/role', { role })
  ),

  // Additional services
  getCategories: withTryCatch(async () => apiClient.get('/categories')),
  addCategory: withTryCatch(async (data: {name: string}) => apiClient.post('categories/add', data)),

  // OTP-based Authentication
  getEmailOrPhoneOtp: withTryCatch(async (data: OtpRequest) => {
    const formData = new FormData();
    if (data.phone) formData.append('phone', data.phone);
    if (data.code) formData.append('code', data.code);
    if (data.email) formData.append('email', data.email);
    
    return apiClient.post<OtpResponse>('/get-email-phone-otp', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }),

  loginWithOtp: withTryCatch(async (data: LoginWithOtpRequest) => {
    const formData = new FormData();
    if (data.phone) formData.append('phone', data.phone);
    if (data.code) formData.append('code', data.code);
    if (data.email) formData.append('email', data.email);
    if (data.otp) formData.append('otp', data.otp);
    
    return apiClient.post<AuthResponse>('/login-with-otp', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }),

  // Signup Process
  getSignupPhoneOtp: withTryCatch(async (data: SignupOtpRequest) => {
    const formData = new FormData();
    if (data.phone) formData.append('phone', data.phone);
    if (data.code) formData.append('code', data.code);
    
    return apiClient.post<OtpResponse>('/get-phone-otp', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }),

  getSignupEmailOtp: withTryCatch(async (data: { email: string }) => {
    const formData = new FormData();
    formData.append('email', data.email);
    
    return apiClient.post<OtpResponse>('/get-email-otp', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }),

  verifyOtpByPhone: withTryCatch(async (data: VerifyOtpRequest) => {
    const formData = new FormData();
    if (data.phone) formData.append('phone', data.phone);
    if (data.otp) formData.append('otp', data.otp);
    
    return apiClient.post<OtpResponse>('/verify-otp-byphone', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }),

  verifyOtpByEmail: withTryCatch(async (data: VerifyOtpRequest) => {
    const formData = new FormData();
    if (data.email) formData.append('email', data.email);
    if (data.otp) formData.append('otp', data.otp);
    
    return apiClient.post<OtpResponse>('/verify-otp-byemail', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }),

  registerUserDetails: withTryCatch(async (data: RegisterUserDetailsRequest) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    return apiClient.post<AuthResponse>('/register-user-details', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }),
};