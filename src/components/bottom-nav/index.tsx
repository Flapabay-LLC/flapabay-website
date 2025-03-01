import { useState } from "react";
import { FiSearch, FiHeart, FiMap, FiMessageSquare, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";


const tabs = [
  { name: "Search", icon: <FiSearch />, to: "/" },
  { name: "Wishlist", icon: <FiHeart />, to: "/whishlist-page" },
  { name: "Trips", icon: <FiMap />, to: "/trip-page" },
  { name: "Messages", icon: <FiMessageSquare />, to: "/dashboard-message" },
  { name: "Profile", icon: <FiUser />, to: "/account-page" },
];

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("Search");

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white z-50 shadow-lg border-t flex justify-around py-2 md:hidden">
      {tabs.map((tab) => (
        <Link key={tab.name} to={tab.to} className="flex flex-col items-center">
          <button
            onClick={() => setActiveTab(tab.name)}
            className={`flex flex-col items-center text-[12px] ${
              activeTab === tab.name ? "text-[#ffc500] font-semibold" : "text-black"
            }`}
          >
            <span className="text-[16px]">{tab.icon}</span>
            {tab.name}
          </button>
        </Link>
      ))}
    </div>
  );
}
