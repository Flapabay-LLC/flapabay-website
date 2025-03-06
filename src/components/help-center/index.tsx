import { useState, useRef, useEffect } from "react";
import { FiSearch, FiFileText } from "react-icons/fi";
import Guest from "./Guest";
import Host from "./Host";
import ExperienceHost from "./ExperienceHost";
import TravelAdmin from "./TravelAdmin";
import Header from "../home/home-v1/Header";
import MobileMenu from "../common/mobile-menu";
import { SearchNormal } from "iconsax-react";
import Footer from "../common/default-footer";

const tabs = [
  { name: "Guest", component: <Guest /> },
  { name: "Host", component: <Host /> },
  { name: "Experience Host", component: <ExperienceHost /> },
  { name: "Travel Admin", component: <TravelAdmin /> },
];

const suggestions = [
  "How to book a trip?",
  "Cancel a reservation",
  "Change account settings",
  "Refund policies",
  "Host payment options",
];

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const handleSelectSuggestion = (text) => {
    setSearchText(text);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header />
      <MobileMenu />
      <div className="flex flex-col items-center pt-6 lg:pt-36">
        <h1 className="pb-6 text-3xl font-medium">Hi Fahad, how can we help?</h1>
        
        {/* Search Bar with Suggestions */}
        <div className="relative w-full max-w-4xl mb-6" ref={searchRef}>
          <input
            type="text"
            placeholder="Search how-tos and more"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full px-4 py-3 border rounded-full shadow-sm"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#FFC500] text-white p-2 rounded-full">
            <SearchNormal size={18} />
          </button>
          
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <FiFileText className="mr-3 text-gray-500" size={18} />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex w-full max-w-6xl px-2 pt-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-2 px-4 text-sm font-medium ${
                activeTab === tab.name ? "border-b-2 border-black" : "text-gray-500"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="w-full max-w-6xl pt-8 m-1">{tabs.find((tab) => tab.name === activeTab)?.component}</div>
      </div>
      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>
    </>
  );
}