import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSetAtom } from "jotai";
import { setAuthAtom } from "@/store/authStore";
import { authService } from "@/api/services/a avoid this file";
import { RegisterUserDetailsRequest, AuthResponse } from "@/api/types/apiTypes";

interface FinishSignupModalProps {
  isOpen?: boolean;
  onClose: () => void;
  phone: string;
  email: string;
  code: string; // Add country code
}

export const FinishSignupModal = ({ isOpen, onClose, phone, email, code }: FinishSignupModalProps) => {
  const navigate = useNavigate();
  const { verifyOtpByPhone, verifyOtpByEmail, registerUserDetails } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Password strength validation
  const validatePassword = (pass: string) => {
    const requirements = {
      minLength: pass.length >= 8,
      hasUpperCase: /[A-Z]/.test(pass),
      hasLowerCase: /[a-z]/.test(pass),
      hasNumber: /[0-9]/.test(pass),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
    };

    const strength = Object.values(requirements).filter(Boolean).length;
    const strengthPercentage = (strength / 5) * 100;

    return {
      requirements,
      strength,
      strengthPercentage,
      isValid: strength >= 4 // Require at least 4 out of 5 requirements
    };
  };

  // Validation Function
  const validateForm = () => {
    let isValid = true;
    setErrorMessage(""); // Clear previous errors

    if (!formData.firstName || formData.firstName.length < 3) {
      setErrorMessage("First name must be at least 3 characters.");
      isValid = false;
    }
    if (isValid && (!formData.lastName || formData.lastName.length < 3)) {
      setErrorMessage("Last name must be at least 3 characters.");
      isValid = false;
    }
    if (isValid && !formData.address) {
      setErrorMessage("Address is required.");
      isValid = false;
    }
    if (isValid && !formData.city) {
      setErrorMessage("City is required.");
      isValid = false;
    }
    if (isValid && !formData.state) {
      setErrorMessage("State is required.");
      isValid = false;
    }
    if (isValid && !formData.zipCode) {
      setErrorMessage("ZIP Code is required.");
      isValid = false;
    }
    if (isValid && !formData.country) {
      setErrorMessage("Country is required.");
      isValid = false;
    }
    
    const passwordValidation = validatePassword(password);
    if (isValid && !passwordValidation.isValid) {
      setErrorMessage("Password does not meet requirements. Please ensure it has at least 8 characters, one uppercase, one lowercase, one number, and one special character.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous server errors

    if (!validateForm()) {
      return; // Stop if client-side validation fails
    }

    setIsLoading(true);

    try {
      // First verify OTP
      const [verifyResponse, verifyError] = await verifyOtpByPhone({
        phone: phone,
        otp: code // This should be the OTP entered by user
      });

      if (verifyError) {
        throw new Error(verifyError.message || "OTP verification failed");
      }

      // Then register user details
      const registerData: RegisterUserDetailsRequest = {
        fname: formData.firstName,
        lname: formData.lastName,
        email: email,
        phone: phone,
        password: password,
        dob: '2000-01-01', // Placeholder for DOB, adjust as needed
      };

      const [registerResponse, registerError] = await registerUserDetails(registerData);

      if (registerError) {
        throw new Error(registerError.message || "Registration failed");
      }

      if (!registerResponse?.data.success) {
        throw new Error("Registration failed");
      }

      toast({
        title: "Success",
        description: "Registration successful!",
      });

      onClose();
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Registration failed:", error);
      setErrorMessage(error.message || "Registration failed. Please try again.");
      toast({
        title: "Error",
        description: error.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative z-60 p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">Complete Your Registration</h2>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold block sm:inline">Let's try that again</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={phone}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

            <button
              type="submit"
              disabled={isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            >
            {isLoading ? 'Completing Registration...' : 'Complete Registration'}
            </button>
        </form>
      </div>
    </div>
  );
}; 
