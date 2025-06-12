import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import { motion } from 'framer-motion';
import MetaData from "@/components/common/MetaData";
import LoginModal from "@/components/auth/LoginModal";
import ConfirmationModal from "@/components/auth/verify/ConfirmationModal";
import EmailConfirmationModal from "@/components/auth/verify/EmailConfirmationModal";

const metaInformation = {
  title: "Login || Flapabay- Apartment Rental, Experiences and More!",
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");

  if (loading) return null; // or a spinner
  if (user) {
    if (user.role === 'host') {
      return <Navigate to="/dashboard/host" replace />;
    } else {
      // Default to guest if role is missing or unknown
      return <Navigate to="/dashboard/guest" replace />;
    }
  }

  const handleClose = () => {
    navigate('/'); // Navigate to home page when modal is closed
  };

  const handlePhoneSubmit = (phone: string, code: string) => {
    setPhoneNumber(phone);
    setCountryCode(code);
    setIsEmailMode(false);
    setShowConfirmationModal(true);
  };

  const handleEmailSubmit = (email: string) => {
    setEmail(email);
    setIsEmailMode(true);
    setShowConfirmationModal(true);
  };

  return (
    <>
      <MetaData meta={metaInformation} />
      <section className="min-h-screen px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-xl">
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-2">Sign in to your account</h2>
                  <p className="text-gray-60 mb-4">
                    Sign in with this account across the following sites.
                  </p>
                </div>
                {showConfirmationModal ? (
                  isEmailMode ? (
                    <EmailConfirmationModal 
                      onClose={() => setShowConfirmationModal(false)} 
                      email={email}
                      flowType="login"
                    />
                  ) : (
                    <ConfirmationModal 
                      onClose={() => setShowConfirmationModal(false)} 
                      phone={phoneNumber}
                      code={countryCode}
                      flowType="login"
                    />
                  )
                ) : (
                  <LoginModal 
                    onClose={handleClose}
                    onPhoneSubmit={handlePhoneSubmit}
                    onEmailSubmit={handleEmailSubmit}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LoginPage; 