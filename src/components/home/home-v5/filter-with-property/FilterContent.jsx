import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import LookingFor from "./LookingFor";
import Location from "./Location";
import { SearchNormal, Setting4, Size } from "iconsax-react";
import { useScreenSize } from "@/utilis/screenUtils";

const FilterContent = () => {
  const isMobile = useScreenSize();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Experiences");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const modalRef = useRef(null);

  const suggestions = [
    { name: "Nearby", desc: "Find what’s around you", icon: "📍" },
    { name: "Islamabad, Pakistan", desc: "For sights like Faisal Mosque", icon: "🏝️" },
    { name: "Shimla, India", desc: "For nature-lovers", icon: "🏕️" },
    { name: "New Delhi, India", desc: "For its stunning architecture", icon: "🏛️" },
    { name: "Manali, India", desc: "Great for winter getaways", icon: "❄️" },
  ];

  const handleFocus = () => setIsModalOpen(true);

  const handleBlur = (event) => {
    if (!modalRef.current?.contains(event.relatedTarget)) {
      setIsModalOpen(false);
    }
  };

  const handleSelectSuggestion = (name) => {
    setSearchValue(name);
    setIsModalOpen(false); // Close modal after selecting
  };







  const tabs = [
    { id: "Explore", label: "Stays" },
    { id: "Experiences", label: "Experiences" },
  ];

  const [price, setPrice] = useState({ min: 2000, max: 45000 });

  // price range handler
  const handleOnChange = (value) => {
    setPrice({ min: value[0], max: value[1] });
  };

  return (
    <div className="advance-style4 at-home10 mt-100 mt50-lg mb10 mx-auto animate-up-2">
      <ul className="nav nav-tabs p-0 m-0">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      {!isMobile ? (
        <div>
          <div className="tab-content text-start">
            {tabs.map((tab) => (
              <div
                className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
                key={tab.id}
              >
                <div className="advance-content-style3 at-home5">
                  <div className="row align-items-center">
                    <div className="col-6 col-md-6 col-xl-4 bdrr1 bdrrn-sm">
                      <label className="form-label fz16 mb-1">Where to ?</label>
                      <div className="advance-search-field position-relative">
                        <form className="form-search position-relative">
                          <div className="box-search">
                            <input
                              className="form-control bgc-f7 bdrs12 ps-0"
                              placeholder={
                                tab.label === "Experiences"
                                  ? "Search your experiences"
                                  : `Apartments, experiences, destinations! ${tab.label}`
                              }
                              type="text"
                              name="search"
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                              onFocus={handleFocus}
                              // onBlur={handleBlur}
                            />
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="col-md-2 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm hidate">
                      <div className="mt-3 mt-md-0 px-0">
                        <div className="bootselect-multiselect">
                          <label className="fz13">Add Checkin</label>
                          <LookingFor />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm hidate">
                      <div className="mt-3 mt-md-0">
                        <div className="bootselect-multiselect">
                          <label className="fz13">Checkout</label>
                          <Location />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm hidate">
                      <div className="mt-3 mt-md-0">
                        <div className="dropdown-lists">
                          <label className="fz13 mb-1">Add Guests</label>
                          <div
                            className="btn open-btn text-start dropdown-toggle"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            style={{ fontSize: "13px" }}
                          >
                            ${price.min} - ${price.max}{" "}
                            <i className="fas fa-caret-down" />
                          </div>
                          <div className="dropdown-menu">
                            <div className="widget-wrapper pb20 mb0 pl20 pr20">
                              <div className="range-wrapper at-home10">
                                {/* Using rc-slider */}
                                <Slider
                                  range
                                  min={0}
                                  max={100000}
                                  defaultValue={[price.min, price.max]}
                                  onChange={handleOnChange}
                                  tipFormatter={(value) => `$${value}`}
                                />
                                <div className="d-flex align-items-center">
                                  <span id="slider-range-value1">
                                    ${price.min}
                                  </span>
                                  <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
                                  <span id="slider-range-value2">
                                    ${price.max}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-xl-2 bdrr1 bdrrn-sm px20 pl15-sm">
                      <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                        <button
                          className="advance-search-btn"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#advanceSeachModal"
                        >
                          <span className="flaticon-settings" /> Filters
                        </button>
                        <button
                          className="ud-btn btn-thm ms-2 search-tbn"
                          type="button"
                          onClick={() => navigate("/grid-full-3-col")}
                        >
                          <SearchNormal color="white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="tab-content text-start">
            {tabs.map((tab) => (
              <div
                className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
                key={tab.id}
              >
                <div className="advance-content-style3 at-home5">
                  <div className="flex-row align-items-center">
                    {/* Search Section */}
                    <div className="col-11 col-md-8 d-flex flex-column">
                      {/* Label and Input Group */}
                      <div className="form-group w-100">
                        <div className="advance-search-field input-wrapper position-relative">
                          <div className="col-8 col-md-4 col-xl-3 bdrr1 bdrrn-sm">
                            <label
                              htmlFor="searchInput"
                              className="form-label fz16 mb-1"
                            >
                              Where to?
                            </label>
                            <div className="advance-search-field position-relative">
                              <form className="form-search position-relative">
                                <div className="box-search">
                                  <input
                                    className="form-control bgc-f7 bdrs12 ps-0"
                                    placeholder={tab.label === "Experiences"
                                      ? "Search your experiences"
                                      : `Apartments, experiences, destinations! ${tab.label}`}
                                    type="text"
                                    name="search"
                                  />
                                </div>
                              </form>
                            </div>
                          </div>
                          {/* Search Button */}
                          <button style={{position:"fixed", right:50, width: 55, height:55}}
                            className="ud-btn  btn-thm ms-2 search-tbn search-btn"
                            type="button"
                            onClick={() => navigate("/grid-full-3-col")}
                          >
                            <SearchNormal color="white" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Filter Section */}
                    <div className="col-4 col-md-4 d-flex justify-content-md-end mt-3 mt-md-0">
                      <button style={{position:"fixed", top:60, right:5, width: 55, height:55}}
                        className="advance-search-btn"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#advanceSeachModal"
                      >
                        <Setting4 size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}








{isModalOpen && (
        <div
          ref={modalRef}
          className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50"
        >
          {/* Recent Searches */}
          <h3 className="text-sm font-semibold  text-left text-gray-600">Recent searches</h3>
          <div className="flex items-center gap-2 mt-2 cursor-pointer" onClick={() => handleSelectSuggestion("SHAPE Itaim Apt high standard studio")}>
            <img
              src="https://img.freepik.com/free-photo/close-up-horse-nature_23-2149312906.jpg"
              alt="Recent Search"
              className="w-12 h-12 rounded-md"
            />
            <div>
              <p className="font-medium text-gray-900">
                SHAPE Itaim Apt high standard studio 15th floor
              </p>
              <p className="text-xs text-left text-gray-500">Feb 26 – Mar 3 · 1 guest</p>
            </div>
          </div>

          {/* Suggested Destinations */}
          <h3 className="text-sm font-semibold text-gray-600 mt-4 text-left">Suggested destinations</h3>
          <ul className="mt-2 space-y-3">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => handleSelectSuggestion(item.name)}
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  );
};

export default FilterContent;
