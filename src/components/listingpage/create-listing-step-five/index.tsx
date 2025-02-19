import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { Link } from "react-router-dom";

const CreateListingStepFive = () => {
  const [address, setAddress] = useState<string>(""); // Track address input
  const [showOnMap, setShowOnMap] = useState<boolean>(false); // Track "Show on Map" toggle
  const [viewport, setViewport] = useState({
    latitude: 37.7749, // Default latitude (San Francisco)
    longitude: -122.4194, // Default longitude (San Francisco)
    zoom: 12, // Default zoom level
  });

  // Handle address change
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    // Here you can add logic to update the map viewport based on the address
  };

  // Handle map click to update marker position
  const handleMapClick = (e: any) => {
    const [longitude, latitude] = e.lngLat;
    setViewport({
      ...viewport,
      latitude,
      longitude,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full fixed top-0 bg-white left-0 flex justify-between items-center p-4 z-50">
        <div className="text-2xl font-bold text-black">
          <Link className="header-logo logo1" to="/">
            <img src="/images/header-logo2.svg" alt="Header Logo" />
          </Link>
        </div>
        <button className="text-sm flex items-center border border-gray-100 rounded-full px-3 py-2">
          Save & exit
        </button>
      </header>

      {/* Content */}
      <div className="min-h-screen mt-24 p-6">
        <div className="max-w-4xl mx-auto p-8">
          {/* Page Title */}
          <h1 className="text-2xl font-bold mb-8">Where's your place located?</h1>
          <p className="text-gray-600 mb-8">
            Your address is only shared with guests after they've made a reservation.
          </p>

          {/* Address Input */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter your address
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC500]"
              placeholder="Enter your address"
              value={address}
              onChange={handleAddressChange}
            />
          </div>

          {/* Show on Map Toggle */}
          <div className="flex items-center mb-8">
            <input
              type="checkbox"
              id="showOnMap"
              checked={showOnMap}
              onChange={(e) => setShowOnMap(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showOnMap" className="text-gray-700">
              Show on General Store Room
            </label>
          </div>

          {/* Mapbox Map */}
          {showOnMap && (
            <div className="mb-8 h-96">
              <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/mapbox/streets-v11" // Mapbox style
                onViewportChange={(newViewport) => setViewport(newViewport)}
                onClick={handleMapClick}
                mapboxApiAccessToken="pk.eyJ1IjoicmFqcG9vdGZhaGFkNzcxIiwiYSI6ImNtNHdmeHR5bTBlcTUyaXA3aW02bXZpMWMifQ.V4RKMEW-u84e5foK0FpBLA" // Replace with your Mapbox token
              >
                <Marker
                  latitude={viewport.latitude}
                  longitude={viewport.longitude}
                >
                  <div className="text-2xl">📍</div> {/* Marker icon */}
                </Marker>
              </ReactMapGL>
            </div>
          )}

          {/* Share Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Share details close</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC500]"
                placeholder="Name"
              />
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC500]"
                placeholder="Text Message"
              />
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC500]"
                placeholder="Address"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full left-0 fixed bottom-0 bg-white shadow-md flex flex-col">
        <div className="w-full h-1 bg-gray-300 rounded-full relative">
          <div
            className="absolute bg-[#FFC500] top-0 left-0 h-full rounded-full"
            style={{ width: "21%" }} // Adjust progress bar width
          ></div>
        </div>

        <div className="flex items-center justify-end">
          <Link to={address ? "/create-listing-step-six" : "#"}>
            <button
              className={`mt-2 px-3 py-1 text-lg rounded-lg mb-2 mr-2 ${
                address
                  ? "bg-[#FFC500] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!address} // Disable button if no address is entered
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateListingStepFive;