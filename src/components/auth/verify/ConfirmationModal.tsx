import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/api/services/a avoid this file";
import left from "@/assets/left.png";
import { useSetAtom } from "jotai";
import { setAuthAtom } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import OtpInput from "react-otp-input";

interface ConfirmationModalProps {
  onClose: () => void;
  phone: string;
  code: string;
  flowType: 'login' | 'signup';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose, phone, code, flowType }) => {
  const { loginWithOtp, verifyOtpByPhone, getOtp, getSignupPhoneOtp } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setError("");
  };

  const handleVerifyOtp = async () => {
    setIsVerifying(true);
    setError("");

    if (otp.length !== 5) {
      setError("Please enter the complete OTP code.");
      setIsVerifying(false);
      return;
    }

    if (flowType === 'signup') {
      const [verifyResponse, verifyError] = await verifyOtpByPhone({
        phone,
        otp: otp
      });

      if (verifyError) {
        setError(verifyError.message || "Sorry, we could not verify the code. Please try again.");
        setIsVerifying(false);
        return;
      }
      // If verification is successful for signup, close the modal.
      // The parent (SignupModal) will handle the next step (FinishSignupModal).
      onClose();
      setIsVerifying(false);

    } else { // flowType === 'login'
      const [loginResponse, loginError] = await loginWithOtp({
        phone,
        code,
        otp: otp
      });

      if (loginError) {
        setError(loginError.message || "Sorry, we could not complete login. Please try again.");
        setIsVerifying(false);
        return;
      }
      if(loginResponse){
        secureStorage.setItem('auth_token', loginResponse.token);
        secureStorage.setItem('flapabay_user_session', JSON.stringify(loginResponse.user));
      }

      onClose();
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setError("");

    let response, error;

    if (flowType === 'signup') {
      [response, error] = await getSignupPhoneOtp({
        phone,
        code
      });
    } else { // login
      [response, error] = await getOtp({
        phone,
        code
      });
    }

    if (error) {
      setError(error.message || "Failed to resend OTP. Please try again.");
      setIsResending(false);
      return;
    }

    setResendDisabled(true);
    setCountdown(30);
    setOtp("");
    setIsResending(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative z-60 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <button onClick={onClose}>
            <img src={left} alt="Close" className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-center flex-1">Verify your phone</h2>
        </div>
        <div className="h-[.5px] w-full bg-gray-400 mt-2" />

        <div className="mt-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold block sm:inline">Let's try that again</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          <p className="text-sm text-gray-600 mb-4">
            Enter the verification code sent to {phone}
          </p>
          <div className="flex justify-center space-x-2 mb-4">
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={5}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "3rem",
                height: "3rem",
                margin: "0 0.5rem",
                fontSize: "1.125rem",
                borderRadius: "0.5rem",
                border: error ? "1px solid #ef4444" : "1px solid #d1d5db", // gray-300 or red-500 on error
                backgroundColor: "#ffffff",
                textAlign: "center",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
        </div>

        <button 
          className="w-full bg-[#ffc500] text-white font-semibold py-2 rounded-2xl mt-4"
          onClick={handleVerifyOtp}
          disabled={isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>

        <div className="text-center mt-4">
          <button 
            className={`text-sm text-black underline font-semibold ${resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleResendOtp}
            disabled={resendDisabled || isResending}
          >
            {isResending 
              ? 'Sending...' 
              : resendDisabled 
                ? `Resend code in ${countdown}s` 
                : "Didn't receive the code? Resend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
