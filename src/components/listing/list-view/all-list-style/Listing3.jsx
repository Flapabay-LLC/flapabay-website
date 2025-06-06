import listings from "@/data/listings";

import { Link } from "react-router-dom";
import React from "react";

const Listing3 = () => {
  return (
    <>
      {listings.slice(1, 4).map((listing) => (
        <div className="col-md-6 col-xl-4" key={listing.id}>
          <div className="listing-style6">
            <div className="list-thumb">
              <img
               
                className="w-100 cover"
                src={listing.image}
                alt="listings"
              />

              <div className="sale-sticker-wrap">
                {!listing.forRent && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    Featured
                  </div>
                )}
              </div>

              <div className="list-meta">
                <div className="icons">
                  <a href="#">
                    <span className="flaticon-like" />
                  </a>
                  <a href="#">
                    <span className="flaticon-new-tab" />
                  </a>
                  <a href="#">
                    <span className="flaticon-fullscreen" />
                  </a>
                </div>
              </div>
            </div>
            <div className="list-content">
              <div className="list-price mb-2">{listing.price}</div>
              <h6 className="list-title">
                <Link to={`/single-v3/${listing.id}`}>{listing.title}</Link>
              </h6>
              <p className="list-text">{listing.location}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Listing3;
