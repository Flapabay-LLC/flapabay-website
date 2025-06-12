import AdvanceFilterModal from "@/components/common/advance-filter";
import FilterContent from "./FilterContent";
import { useState } from "react";

const FilterWithProperties = ({ onListingTypeSelect, selectedListingType }) => {
  return (
    <>
      <div className="inner-banner-style1 text-center">
        <FilterContent 
          onListingTypeSelect={onListingTypeSelect}
          selectedListingType={selectedListingType}
        />
      </div>
      {/* End Hero content */}

      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
    </>
  );
};

export default FilterWithProperties;
