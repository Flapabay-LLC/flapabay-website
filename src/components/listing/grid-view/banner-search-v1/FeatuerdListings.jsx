


import { Link } from "react-router-dom";

const FeaturedListings = ({data,colstyle}) => {
  return (
    <>
      {data.map((listing) => (
        <div  className={` ${colstyle ? 'col-sm-12':'col-sm-6'}  `} key={listing.id}>
          <div className={colstyle ? "listing-style7 listCustom listing-type" : "listing-style7"}>
            <div className="list-thumb"  >
              <img
              
                style={{height:'228px'}}
                className="w-100  cover"
                src={listing.image}
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {listing.forRent && (
                  <div className="list-tag rounded-0 fz12">
                    <span className="flaticon-electricity" />
                    Featured
                  </div>
                )}
                <div className="list-tag2 rounded-0 fz12">FOR SALE</div>
              </div>
              <div className="list-meta">
                <a href="#" className="mr5">
                  <span className="flaticon-fullscreen" />
                </a>
                <a href="#" className="mr5">
                  <span className="flaticon-new-tab" />
                </a>
                <a href="#">
                  <span className="flaticon-like" />
                </a>
              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
                <Link  to={`/single-v5/${listing.id}`}>{listing.title}</Link>
              </h6>

              <div className="d-flex justify-content-between align-items-center">
                <div className="list-price">
                  {listing.price} / <span>mo</span>
                </div>
                <div className="list-meta2 d-flex align-items-center">
                  <a href="#" className="mr10">
                    <span className="flaticon-bed mr5" /> {listing.bed}
                  </a>
                  <a href="#" className="mr10">
                    <span className="flaticon-shower mr5" /> {listing.bath}
                  </a>
                  <a href="#">
                    <span className="flaticon-expand" /> {listing.sqft}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
