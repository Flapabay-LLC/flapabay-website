import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Pagination from "@/components/listing/Pagination";
import FeaturedListings from "@/components/listing/map-style/header-map-style/FeatuerdListings";
import PropertyFilteringMap from "@/components/listing/map-style/header-map-style/PropertyFilteringMap";
import TopFilterBar from "@/components/listing/map-style/header-map-style/TopFilterBar";
import TopFilterBar2 from "@/components/listing/map-style/header-map-style/TopFilterBar2";
import React from "react";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Header Map Style || Flapabay- Apartment Rental, Experiences and More!",
};

const HeaderMapStyle = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

     <PropertyFilteringMap/>
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default HeaderMapStyle;
