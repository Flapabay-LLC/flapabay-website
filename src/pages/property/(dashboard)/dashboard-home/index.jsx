import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";

import MetaData from "@/components/common/MetaData";
import TodayHome from "@/components/property/dashboard/dashboard-home/TodayHome";

const metaInformation = {
  title: "Dashboard Home || Flapabay- Apartment Rental, Experiences and More!",
};

const DashboardHome = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}

                
                {/* col-lg-12 */}
              </div>
              {/* End .row */}

              
              {/* End .row */}

              <div className="row">
                <div>
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2  mb30 overflow-hidden position-relative">
                    <div className="packages_table table-responsive">
                      <TodayHome/>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardHome;
