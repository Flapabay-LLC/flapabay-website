import AdvanceFilterModal from "@/components/common/advance-filter";
import HeroContent from "./HeroContent";
import FilterWithProperties from "@/components/home/home-v5/filter-with-property";
import PropertiesByCities from "@/components/home/home-v4/PropertiesByCities";
import { Home } from "iconsax-react";

import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

const Hero = () => {
  return (
    <>
      <div className="text-center inner-banner-style1">
        
        <FilterWithProperties/>
        
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

    // <div>
    //   hello
    // </div>
  );
};

export default Hero;
