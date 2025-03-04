import React from "react";
import AppWidget from "./AppWidget";


const Cta = () => {
  return (
    <section className="col-12 pt-50 our-cta3 pb100 pt60-md pb60-md">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-xl-6 d-none d-xl-block">
            <div className="cta-img">
              <img
               
                src="/images/about/mobile-img-1.png"
                alt="mobile"
              />
            </div>
          </div>
          {/* End col-lg-5 */}

          <div className="ml-2 col-lg-6 col-xl-5 offset-xl-1">
            <div className="cta-style5">
            <h1 className="text-white cta-title downloadme">Discover & Connect Download the <t className="text-primary">App</t></h1>
            
              <span className="app-tag mb25">Live like a local!</span>              
              <p className="text-white cta-text mb60">
              Book your next stay or experience on the go with the FlapaBay App. Browse and book unique accommodations to stay in, whether you're traveling by plane, road or anywhere else.
              </p>
              <AppWidget />
            </div>
          </div>
          {/* End col-lg-7 */}
        </div>
        {/* End .row */}
      </div>
    </section>
  );
};

export default Cta;
