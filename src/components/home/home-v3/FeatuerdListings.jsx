

import { Heart } from "iconsax-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const FeaturedListings = ({cities}) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // Click state
  return (
    <>
      {cities.slice(0, 8).map((listing) => (
        <div className="col-sm-6 col-lg-4 col-xl-3" key={listing.id}>
          <div className="listing-style5">
            <Link to={"/booking-page"}>
            <div className="list-thumb">
              <img
               
                className="w-100 h-100 cover"
                src="images/listings/g1.jpg"
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {listing.featured && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    Featured
                  </div>
                )}
              </div>
              <div className="list-meta2">
                {/* <a href="#">
                  <span className="flaticon-like" />
                </a>
                <a href="#">
                  <span className="flaticon-new-tab" />
                </a> */}
                <a //onMouseEnter={() => setIsHovered(true)}
                //</div>onMouseLeave={() => setIsHovered(false)}
                href="#"> 
                  <Heart variant={isClicked ? "Bold" : isHovered ? "Bold" : ""}/>
                </a>
              </div>
            </div>
            </Link>
            <div className="list-content">
            <h6 className="list-title">
                <Link to={"/booking-page"}>{listing.title}</Link>
              </h6>
              <div className="list-price mb-2 text-primary">
                {listing.price} / <span>mo</span>
              </div>
              
              <p className="list-text">{listing.location}</p>
              <div className="list-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" /> {listing.bed} bed
                </a>
                <a href="#">
                  <span className="flaticon-shower" /> {listing.bath} bath
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {listing.sqft} sqft
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
