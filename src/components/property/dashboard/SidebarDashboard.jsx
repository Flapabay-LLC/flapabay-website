import { Link } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { modeAtom } from "../../../context/atom";
const SidebarDashboard = () => {
  const { pathname } = useLocation();
  const [isHosting] = useAtom(modeAtom);

  
  const sidebarItems = [
    {
      items: [
        {
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "Today",
        },
        {
          href: "/dashboard-message",
          icon: "flaticon-chat-1",
          text: "Message",
        },
        {
          // href: "/dashboard-my-properties",
          href: "/dashboard-calender",
          icon: "flaticon-home",
          text: "Calender",
        },
        {
          // href: "/dashboard-my-favourites",
          href: "/dashboard-my-favourites",
          icon: "flaticon-like",
          text: "Reservation",
        },
        {
          // href: "/dashboard-saved-search",
          href: "/dashboard-saved-search",
          icon: "flaticon-search-2",
          text: "Listing",
        },
        {
          // href: "/dashboard-add-property",
          href: "/dashboard-earnings",
          icon: "flaticon-new-tab",
          text: "Earnings",
        },
        {
          // href: "/dashboard-reviews",
          href: "/dashboard-reviews",
          icon: "flaticon-review",
          text: "Insights",
        },
        {
          // href: "/dashboard-add-property",
          href: "/create-listing",
          icon: "flaticon-new-tab",
          text: "Create new listings",
        },
        {
          href: "/dashboard-guidebook",
          // href: "/dashboard-my-package",
          icon: "flaticon-protection",
          text: "Guidbooks",
        },
        {
          href: "/dashboard-experience",
          // href: "/dashboard-my-package",
          icon: "flaticon-protection",
          text: "Host an experience",
        },
        
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "Logout",
        },
      ],
    },
  ];

  const travellingSidebarItems = [
    {
      items: [
        {
          href: "/dashboard-message",
          icon: "flaticon-chat-1",
          text: "Message",
        },
        {
          href: "/dashboard-experience",
          // href: "/dashboard-my-package",
          icon: "flaticon-protection",
          text: "Host an experience",
        },
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "Logout",
        },
      ],
    },
  ];

  const currentSidebarItems = isHosting ? sidebarItems : travellingSidebarItems;

  const getActiveClass = (href) => {
    if (!isHosting && href === "/dashboard-message") {
      return "-is-active"; // Automatically set as active when in Travelling mode
    }
    return pathname === href ? "-is-active" : ""; // Set as active based on pathname
  };

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {currentSidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${
                sectionIndex === 0 ? "mt-0" : "mt30"
              }`}
            >
              {section.title}
            </p>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                
                <Link
                  to={item.href} // Path to navigate to
                  className={`items-center ${getActiveClass(item.href)}`} // Get the active class
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarDashboard;
