import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import left from "../../assets/left.png";
import ForgotPassword from "./ForgotPassword";
import WelcomeModal from "./WelcomeModal"; // Import the next modal
import axios from "axios";
import { useSetAtom } from "jotai";
import { userAtom } from "../../context/atom";




interface EnterCodeModalProps {
  onClose: () => void;
  email: string; // Pass the email to display
}

const EnterCodeModal: React.FC<EnterCodeModalProps> = ({ onClose, email }) => {
  const navigate = useNavigate();
  const [showEmailConfirmationModal, setShowEmailConfirmationModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false); // State for second modal
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for error message

  const handleForgotPassword = () => {
    setShowEmailConfirmationModal(true);
  };

  


  // const handleLogin = async () => {
  //   if (!password) {
  //     setPasswordError("Please enter your password.");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post("http://localhost/flapabay-engine-main/api/v1/login", {
  //       email,
  //       password,
  //     });
  
  //     if (response.status === 200) {
  //       console.log("Login successful:", response.data);
  //       onClose(); // Close modal after successful login
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error.response?.data || error.message);
  //     setPasswordError("Incorrect Email or password. Please try again.");
  //   }
  // };
  

  const handleLogin = async () => {
    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost/flapabay-engine-main/api/v1/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        const userData = response.data.data; // Assuming the API returns user data
        localStorage.setItem("user", JSON.stringify(userData)); // Store in local storage
        setUser(userData); // Update global state
        console.log("Login successful:", userData);
        onClose(); // Close modal after login
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setPasswordError("Incorrect Email or password. Please try again.");
    }
  };



  if (showEmailConfirmationModal) {
    return <ForgotPassword onClose={() => setShowEmailConfirmationModal(false)} />;
  }









  const setUser = useSetAtom(userAtom);











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

        <div className="mt-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full border bg-white border-gray-400 rounded-md py-2 px-3"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(""); // Clear error when user types
            }}
          />
          {/* Show error message if password is incorrect */}
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <button
          className="w-full bg-[#ffc500] text-white font-semibold py-2 rounded-md mt-4"
          onClick={handleLogin}
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
