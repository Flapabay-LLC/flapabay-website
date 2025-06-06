import React from "react";

interface Amenity {
  label: string;
  defaultChecked?: boolean;
}

const Amenities: React.FC = () => {
  const amenities: Amenity[][] = [
    [
      { label: "Attic" },
      { label: "Basketball court", defaultChecked: true },
      { label: "Air Conditioning", defaultChecked: true },
      { label: "Lawn", defaultChecked: true },
    ],
    [
      { label: "TV Cable" },
      { label: "Dryer" },
      { label: "Outdoor Shower" },
      { label: "Washer" },
    ],
    [
      { label: "Lake view" },
      { label: "Wine cellar" },
      { label: "Front yard" },
      { label: "Refrigerator" },
    ],
  ];

  return (
    <>
      {amenities.map((column, columnIndex) => (
        <div className="col-sm-4" key={columnIndex}>
          <div className="widget-wrapper mb20">
            <div className="checkbox-style1">
              {column.map((amenity, amenityIndex) => (
                <label className="custom_checkbox" key={amenityIndex}>
                  {amenity.label}
                  <input
                    type="checkbox"
                    defaultChecked={amenity.defaultChecked}
                  />
                  <span className="checkmark" />
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Amenities; 