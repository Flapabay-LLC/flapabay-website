import { Link } from "react-router-dom";
import MetaData from "@/components/common/MetaData";
import React from "react";
import SignupModal from "@/components/auth/SignupModal";

const metaInformation = {
  title: "Register  || Flapabay- Apartment Rental, Experiences and More!",
};

const Register = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Our Compare Area */}
      <section className="our-compare pt0 pb0">
        <img
          
          src="/images/icon/login-page-icon.svg"
          alt="logo"
          className="login-bg-icon contain"
          data-aos="fade-right"
          data-aos-delay="300"
        />
        <div className="container">
          <div className="row" data-aos="fade-left" data-aos-delay="300">
            <div className="col-lg-6">
              <div className="log-reg-form signup-modal form-style1 bgc-white p50 p30-sm default-box-shadow2 bdrs12">
                <div className="text-center mb40">
                  <Link to="/">
                    <img
                     
                      className="mb25"
                      src="/images/logo.svg"
                      alt="logo"
                    />
                  </Link>
                  <h2>Create account</h2>
                  <p className="text">
                    Sign in with this account across the following sites.
                  </p>
                </div>
                <SignupModal />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
