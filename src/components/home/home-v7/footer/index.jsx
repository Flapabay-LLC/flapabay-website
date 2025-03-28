import AppWidget from "./AppWidget";
import ContactMeta from "./ContactMeta";
import Copyright from "./Copyright";
import { Link } from "react-router-dom";
import MenuWidget from "./MenuWidget";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="footer-widget light-style mb-4 mb-lg-5">
              <Link className="footer-logo" to="/">
                <img
                 
                  className="mb40"
                  src="/images/logo.svg"
                  alt=""
                />
              </Link>

              <ContactMeta />
            </div>
          </div>

          <MenuWidget />

          <div className="col-sm-6 col-lg-3">
            <div className="footer-widget mb-4 mb-lg-5">
              <div className="mailchimp-widget mb30">
                <h6 className="title mb30">Keep Yourself Up to Date</h6>
                <Subscribe />
              </div>

              <AppWidget />
            </div>
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}

      <Copyright />
      {/* End copyright */}
    </>
  );
};

export default Footer;
