import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import left from "../../assets/left.png";
import ForgotPassword from "./ForgotPassword";
import WelcomeModal from "./WelcomeModal"; // Import the next modal

interface EnterCodeModalProps {
  onClose: () => void;
}

const EnterCodeModal: React.FC<EnterCodeModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [showEmailConfirmationModal, setShowEmailConfirmationModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false); // State for second modal

  const handleForgotPassword = () => {
    setShowEmailConfirmationModal(true);
  };

  const handleLogin = () => {
    navigate("/"); // Redirect to home page
    setShowWelcomeModal(true); // Show the next modal after login
  };

  if (showEmailConfirmationModal) {
    return <ForgotPassword onClose={() => setShowEmailConfirmationModal(false)} />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative z-60 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <button onClick={onClose}>
            <img src={left} alt="Close" className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-center flex-1">Login</h2>
        </div>
        <div className="h-[.5px] w-full bg-gray-400 mt-2" />

        <input
          type="text"
          placeholder="Password"
          className="w-full border bg-white mt-6 border-gray-400 rounded-md py-2 px-3 mb-4"
        />
        <button className="w-full bg-[#ffc500] text-white font-semibold py-2 rounded-md" onClick={handleLogin}
        
        >
          Log in
        </button>
        <div className="text-center mt-4">
          <button onClick={handleForgotPassword} className="text-sm text-black underline font-semibold">
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Show the Welcome Modal after login */}
      {showWelcomeModal && <WelcomeModal onClose={() => setShowWelcomeModal(false)} />}
    </div>
  );
};

export default EnterCodeModal;
