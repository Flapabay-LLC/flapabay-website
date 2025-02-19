import Explore from "../../../components/common/Explore";
import Footer from "../../../components/common/default-footer";
import MobileMenu from "../../../components/common/mobile-menu";
import About from "../../../components/home/home-v1/About";
import ApartmentType from "../../../components/home/home-v1/ApartmentType";
import CallToActions from "../../../components/common/CallToActions";
import FeaturedListings from "../../../components/home/home-v1/FeatuerdListings";
import Header from "../../../components/home/home-v1/Header";
import Partner from "../../../components/common/Partner";
import Cta from "@/components/home/home-v6/Cta";

import PropertyByCitiesWrapper from "@/components/home/home-v3/PropertyByCitiesWrapper";
import PropertiesByCities from "../../../components/home/home-v4/PropertiesByCities";
import Testimonial from "../../../components/home/home-v1/Testimonial";
import Hero from "../../../components/home/home-v1/hero";

import Blog from "../../../components/common/Blog";
import { Link } from "react-router-dom";
import PopulerProperty from "../../../components/home/home-v1/PopulerProperty";

import MetaData from "@/components/common/MetaData";
import PropertiesByCategory from "@/components/home/home-v4/PropertiesByCategory";

import React, { useEffect, useState } from "react";
import { useScreenSize } from "@/utilis/screenUtils";

const metaInformation = {
  title: "Home v1 || flapabay - Real Estate ReactJS Template",
};

const Home_V1 = () => {
  const isMobile = useScreenSize();

  return (
    <>
      <MetaData meta={metaInformation} />

      <Header />

      <MobileMenu />

      <section className="home-banner-style1 p0">
        <div className="home-style1">
          <div className="container-fluid container-fluidest">
            <div className="row">
              <div className="col-xl-10 mx-auto">
                <Hero />
               

              </div>
            </div>
            {isMobile && ( 
            <section className="filtericons">
              <div className="">
                <div className="row">
                  <div
                    className="col-lg-12"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="property-city-slider position-relative">
                      <PropertiesByCategory/>
                      
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          
          </div>
          
          <a href="#explore-property">
            <div className="mouse_scroll animate-up-4">
              <img src="/images/about/home-scroll.png" alt="scroll image" />
            </div>
          </a>
        </div>
      </section>
      {!isMobile && (
        <section className="filtericons">
          <div className="container-fluid container-fluidest">
            <div className="row">
              <div
                className="col-lg-12"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="property-city-slider position-relative">
                  <PropertiesByCategory />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* End Home Banner Style V1 */}

      {/* Explore Apartment */}
      <section id="explore-property" className="pb90 pb30-md somesections">
        {/* Popular Property */}
        <PropertyByCitiesWrapper showCircularIcons={false}/>
        {/* Popular Property */}``
      </section>
      {/* End Explore Apartment */}

   
  

    

      
   {/* Our CTA */}
       <Cta />
      
      {/* End Our CTA */}
      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>

      {/* End Our Footer */}
    </>
  );
};

export default Home_V1;
