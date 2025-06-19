import React, { useState } from "react";

import ForgotPassword from "@/components/auth/ForgotPassword";
import left from "@/assets/left.png";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { setAuthAtom } from "@/store/authStore";
import { authService } from "@/api/services/a avoid this file";

interface EnterCodeModalProps {
  onClose: () => void;
  email: string;
}

const EnterCodeModal: React.FC<EnterCodeModalProps> = ({ onClose, email }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [, setAuth] = useSetAtom(setAuthAtom);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleLogin = async () => {
    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    try {
      const { data } = await authService.login({ email, password });
      
      // Update auth state with backend token and user
      setAuth({
        user: data.user,
        token: data.token
      });

      // Store in localStorage if remember me is checked
      if (rememberMe) {
        secureStorage.setItem('auth_token', data.token);
        secureStorage.setItem('flapabay_user_session', JSON.stringify(data.user));
      } else {
        sessionStorage.setItem('auth_token', data.token);
        sessionStorage.setItem('user_data', JSON.stringify(data.user));
      }
      
      console.log("Login successful:", data.user);
      onClose();
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      setPasswordError("Incorrect Email or password. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative z-60 p-6" onClick={(e) => e.stopPropagation()}>
        {showForgotPassword ? (
          <ForgotPassword onClose={() => setShowForgotPassword(false)} />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <button onClick={onClose}>
                <img src={left} alt="Close" className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold text-center flex-1">Login</h2>
            </div>
            <div className="h-[.5px] w-full bg-gray-400 mt-2" />

            <div className="mt-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full border bg-white border-gray-400 rounded-2xl py-2 px-3"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#ffc500] focus:ring-[#ffc500] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <button className="w-full bg-[#ffc500] text-white font-semibold py-2 rounded-2xl mt-4" onClick={handleLogin}>
              Log in
            </button>

            <div className="text-center mt-4">
              <button onClick={handleForgotPassword} className="text-sm text-black underline font-semibold">
                Forgot Password?
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnterCodeModal;
