import React from "react";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  const footerMenuItems = [
    {
      label: "Privacy",
      link: "#",
    },
    {
      label: "Terms",
      link: "#",
    },
    {
      label: "Sitemap",
      link: "#",
    },
  ];

  return (
    <div className="container gray-bdrt1 py-4">
      <div className="row">
        <div className="col-sm-6">
          <div className="text-center text-lg-start">
            <p className="copyright-text ff-heading">
              © Flapabay{getCurrentYear()}{" "}
              <a
                href="https://themeforest.net/user/Copyright"
                target="_blank"
                rel="noopener noreferrer"
              >
                Copyright
              </a>{" "}
              - All rights reserved
            </p>
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className="col-sm-6">
          <div className="text-center text-lg-end">
            <p className="footer-menu ff-heading">
              {footerMenuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <a href={item.link}>{item.label}</a>
                  {index !== footerMenuItems.length - 1 && " · "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
        {/* End .col-sm-6 */}
      </div>
    </div>
  );
};

export default Footer;
