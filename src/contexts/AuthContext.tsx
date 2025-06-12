import React, { createContext, useContext, useEffect, useCallback, ReactNode } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom, setAuthAtom, clearAuthAtom } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/api/types/apiTypes';
import { authService } from '@/api/services/a avoid this file';
import { 
  OtpRequest, 
  LoginWithOtpRequest,
  SignupOtpRequest,
  VerifyOtpRequest,
  RegisterUserDetailsRequest,
  AuthResponse,
  OtpResponse,
  LoginRequest,
  RegisterRequest
} from '@/api/types/apiTypes';
import { ApiError } from '@/api/core/withTryCatch';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: (data: LoginRequest) => Promise<[AuthResponse | null, ApiError | null]>;
  signOut: () => Promise<void>;
  switchRole: () => void;
  getOtp: (data: OtpRequest) => Promise<[OtpResponse | null, ApiError | null]>;
  loginWithOtp: (data: LoginWithOtpRequest) => Promise<[AuthResponse | null, ApiError | null]>;
  getSignupPhoneOtp: (data: SignupOtpRequest) => Promise<[OtpResponse | null, ApiError | null]>;
  getSignupEmailOtp: (email: string) => Promise<[OtpResponse | null, ApiError | null]>;
  verifyOtpByPhone: (data: VerifyOtpRequest) => Promise<[OtpResponse | null, ApiError | null]>;
  verifyOtpByEmail: (data: VerifyOtpRequest) => Promise<[OtpResponse | null, ApiError | null]>;
  registerUserDetails: (data: RegisterUserDetailsRequest) => Promise<[AuthResponse | null, ApiError | null]>;
  login: (data: LoginRequest) => Promise<[AuthResponse | null, ApiError | null]>;
  register: (data: RegisterRequest) => Promise<[AuthResponse | null, ApiError | null]>;
  logout: () => Promise<void>;
  verifyOtp: (data: VerifyOtpRequest) => Promise<[AuthResponse | null, ApiError | null]>;
  signupWithOtp: (data: SignupOtpRequest) => Promise<[AuthResponse | null, ApiError | null]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
  const setAuth = useSetAtom(setAuthAtom);
  const clearAuth = useSetAtom(clearAuthAtom);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('flapabay_user_session');
      if (storedUser) {
        try {
          let userData = JSON.parse(storedUser);
          // Map to the User interface from authService
          userData = {
            id: userData.id || '',
            app_metadata: userData.app_metadata || {},
            user_metadata: userData.user_metadata || { name: userData.user_metadata?.name, picture: userData.user_metadata?.picture },
            aud: userData.aud || 'authenticated',
            email: typeof userData.email === 'string' ? userData.email : '',
            role: userData.role || 'guest',
            created_at: userData.created_at || new Date().toISOString(),
          };
          setUser(userData);
        } catch (err) {
          console.error('Failed to parse stored user data:', err);
          clearAuth();
        }
      } else {
        setUser(null);
      }
    };

    initializeAuth();
  }, []); // Remove dependencies to prevent re-runs

  const handleError = useCallback((err: any, defaultMessage: string) => {
    console.error(defaultMessage, err);
    const errorMessage = err?.message || defaultMessage;
    setError(errorMessage);
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  }, [toast]);

  const login = async (data: LoginRequest): Promise<[AuthResponse | null, ApiError | null]> => {
    setLoading(true);
    try {
      const [response, error] = await authService.login(data);
      if (response?.data) {
        setAuth({
          user: response.data.user,
          token: response.data.token
        });
        toast({
          title: "Welcome to FlapaBay!",
          description: "You have successfully signed in.",
        });
      }
      return [response?.data || null, error];
    } catch (err) {
      handleError(err, "Failed to login");
      return [null, err as ApiError];
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<[AuthResponse | null, ApiError | null]> => {
        setLoading(true);
    try {
      const [response, error] = await authService.register(data);
      if (response?.data) {
        setAuth({
          user: response.data.user,
          token: response.data.token
        });
        toast({
          title: "Welcome to FlapaBay!",
          description: "Your account has been created successfully.",
        });
      }
      return [response?.data || null, error];
    } catch (err) {
      handleError(err, "Failed to register");
      return [null, err as ApiError];
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      clearAuth();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (err) {
      handleError(err, "Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (data: VerifyOtpRequest): Promise<[AuthResponse | null, ApiError | null]> => {
    setLoading(true);
    try {
      const [response, error] = await authService.verifyOtp(data);
      if (response?.data) {
        setAuth({
          user: response.data.user,
          token: response.data.token
        });
      toast({
          title: "OTP Verified",
          description: "Your OTP has been verified successfully.",
      });
      }
      return [response?.data || null, error];
    } catch (err) {
      handleError(err, "Failed to verify OTP");
      return [null, err as ApiError];
    } finally {
      setLoading(false);
    }
  };

  const loginWithOtp = async (data: LoginWithOtpRequest): Promise<[AuthResponse | null, ApiError | null]> => {
    setLoading(true);
    try {
      const [response, error] = await authService.loginWithOtp(data);
      if (response?.data) {
        const { token, user, message } = response.data;
        setAuth({
          user,
          token
        });
      toast({
          title: "Welcome to FlapaBay!",
          description: message || "You have successfully signed in.",
      });
      }
      return [response?.data || null, error];
    } catch (err) {
      handleError(err, "Failed to login with OTP");
      return [null, err as ApiError];
    } finally {
      setLoading(false);
    }
  };

  const signupWithOtp = async (data: SignupOtpRequest): Promise<[AuthResponse | null, ApiError | null]> => {
    setLoading(true);
    try {
      const [response, error] = await authService.signupWithOtp(data);
      if (response?.data) {
        setAuth({
          user: response.data.user,
          token: response.data.token
        });
      toast({
          title: "Welcome to FlapaBay!",
          description: "Your account has been created successfully.",
      });
      }
      return [response?.data || null, error];
    } catch (err) {
      handleError(err, "Failed to signup with OTP");
      return [null, err as ApiError];
    } finally {
      setLoading(false);
    }
  };

  const registerUserDetails = async (data: RegisterUserDetailsRequest): Promise<[AuthResponse | null, ApiError | null]> => {
    setLoading(true);
    try {
      const [response, error] = await authService.registerUserDetails(data);
      if (response?.data) {
        setAuth({
          user: response.data.user,
          token: response.data.token
        });
        toast({
          title: "Welcome to FlapaBay!",
          description: "Your account has been created successfully.",
        });
      }
      return [response?.data || null, error];
    } catch (err) {
      handleError(err, "Failed to register user details");
      return [null, err as ApiError];
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
        user, 
        loading, 
        error, 
        signInWithGoogle: login, 
    signOut: logout,
    switchRole: logout,
    getOtp: async (data: OtpRequest): Promise<[OtpResponse | null, ApiError | null]> => {
      setLoading(true);
      const [response, error] = await authService.getEmailOrPhoneOtp(data);
      setLoading(false);
      return [response?.data || null, error];
    },
        loginWithOtp,
    getSignupPhoneOtp: async (data: SignupOtpRequest): Promise<[OtpResponse | null, ApiError | null]> => {
      setLoading(true);
      const [response, error] = await authService.getSignupPhoneOtp(data);
      setLoading(false);
      return [response?.data || null, error];
    },
    getSignupEmailOtp: async (email: string): Promise<[OtpResponse | null, ApiError | null]> => {
      setLoading(true);
      const [response, error] = await authService.getSignupEmailOtp({ email });
      setLoading(false);
      return [response?.data || null, error];
    },
    verifyOtpByPhone: async (data: VerifyOtpRequest): Promise<[OtpResponse | null, ApiError | null]> => {
      setLoading(true);
      try {
        const [response, error] = await authService.verifyOtpByPhone(data);
        if (response?.data) {
          toast({
            title: "OTP Verified",
            description: "Your OTP has been verified successfully.",
          });
        }
        return [response?.data || null, error];
      } catch (err) {
        handleError(err, "Failed to verify OTP");
        return [null, err as ApiError];
      } finally {
        setLoading(false);
      }
    },
    verifyOtpByEmail: async (data: VerifyOtpRequest): Promise<[OtpResponse | null, ApiError | null]> => {
      setLoading(true);
      try {
        const [response, error] = await authService.verifyOtpByEmail(data);
        if (response?.data) {
          toast({
            title: "OTP Verified",
            description: "Your OTP has been verified successfully.",
          });
        }
        return [response?.data || null, error];
      } catch (err) {
        handleError(err, "Failed to verify OTP");
        return [null, err as ApiError];
      } finally {
        setLoading(false);
      }
    },
    registerUserDetails,
    login,
    register,
    logout,
    verifyOtp,
    signupWithOtp: async (data: SignupOtpRequest): Promise<[AuthResponse | null, ApiError | null]> => {
      setLoading(true);
      try {
        // First get OTP
        const [otpResponse, otpError] = await authService.getSignupPhoneOtp(data);
        if (otpError) {
          return [null, otpError];
        }
        
        // Then verify OTP and register
        const [verifyResponse, verifyError] = await authService.verifyOtpByPhone({
          phone: data.phone,
          otp: data.otp || ''
        });
        
        if (verifyError) {
          return [null, verifyError];
        }
        
        // Finally register user details
        const [registerResponse, registerError] = await authService.registerUserDetails({
          fname: data.fname || '',
          lname: data.lname || '',
          email: data.email || '',
          phone: data.phone || '',
          password: data.password || '',
          dob: data.dob || ''
        });
        
        if (registerResponse?.data) {
          setAuth({
            user: registerResponse.data.user,
            token: registerResponse.data.token
          });
          toast({
            title: "Welcome to FlapaBay!",
            description: "Your account has been created successfully.",
          });
        }
        
        return [registerResponse?.data || null, registerError];
      } catch (err) {
        handleError(err, "Failed to signup with OTP");
        return [null, err as ApiError];
      } finally {
        setLoading(false);
      }
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 