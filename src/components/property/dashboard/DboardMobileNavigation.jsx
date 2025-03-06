import { Link } from "react-router-dom";
import { modeAtom } from "../../../context/atom";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const DboardMobileNavigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
          text: "Messages",
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
          href: "/dashboard-add-property",
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
          text: "Messages",
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
    return pathname === href ? "-is-active" : "";
  };
  return (
    <div className="dashboard_navigationbar d-block d-lg-none">
      <div className="dropdown">
        <button
          className="dropbtn"
          onClick={() => setIsDropdownOpen((prevOpen) => !prevOpen)}
        >
          <i className="fa fa-bars pr10" /> Dashboard Navigation
        </button>
        <ul className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}>
          {currentSidebarItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Assuming section.title exists, else this can be removed */}
              <p
                className={`fz15 fw400 ff-heading mt30 pl30 ${
                  sectionIndex === 0 ? "mt-0" : "mt30"
                }`}
              >
                {section.title}
              </p>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="sidebar_list_item">
                  <Link
                    to={item.href}
                    className={`items-center ${getActiveClass(item.href)}`} // Apply active class based on current path
                  >
                    <i className={`${item.icon} mr15`} />
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DboardMobileNavigation;
