import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Unsubscribe from "@/components/common/wizards-modal/Unsubscribe";
import { useAtom } from "jotai";
import { modeAtom } from "../../../context/atom";
import { RiGlobalLine } from "react-icons/ri";
import CurrencyModal from "./CurrencyModal";
const Header = () => {
  const [navbar, setNavbar] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const [isHosting, setIsHosting] = useAtom(modeAtom); // Get the current mode and setter function

  const handleSwitch = () => {
    setIsHosting(!isHosting); // Toggle the mode state
  };

  return (
    <>
      <header
        className={`header-nav nav-homepage-style main-menu  ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
      >
        <nav className="posr">
          <div className="container-fluid container-fluidest posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" to="/">
                      <img src="/images/header-logo2.svg" alt="Header Logo" />
                    </Link>
                    <Link className="header-logo logo2" to="/">
                      <img src="/images/header-logo2.svg" alt="Header Logo" />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  <a
                    href="#"
                    className="login-info d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#loginSignupModal"
                    role="button"
                  >
                    {/* <i className="far fa-user-circle fz16 me-2" />{" "} */}
                    {/* <span className="d-none d-xl-block">Login / Register</span> */}
                  </a>
                  {/* <span className="d-none d-xl-block">Switch to hosting</span> */}
                  <Link
                    onClick={handleSwitch}
                    className=" font-medium"
                    to="/dashboard-home"
                    // to="/wizards"
                  >
                    {isHosting ? "Switch to Travelling" : "Switch to Hosting"}
                    {/* <i className="fal fa-arrow-right-long" /> */}
                  </Link>

                  <div className="flex items-center">
                    {/* Global Icon to Open Modal */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="p-2 text-xl"
                    >
                      <RiGlobalLine />
                    </button>
                    {/* <span className="ml-2">{selectedCurrency}</span> */}
                  </div>

                  <Link
                    href="#"
                    className="login-info d-flex align-items-center ud-btn add-property menu-btn bdrs60 mx-2 mx-xl-4"
                    data-bs-toggle="modal"
                    data-bs-target="#loginSignupModal"
                    role="button"

                    // className="ud-btn add-property menu-btn bdrs60 mx-2 mx-xl-4"
                    // to="/dashboard-add-property"
                    // to="/wizards"
                  >
                    Login / Signup
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                  <a
                    className="sidemenu-btn filter-btn-right"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <img
                      className="img-1"
                      src="/images/icon/nav-icon-white.svg"
                      alt="humberger menu"
                    />

                    <img
                      className="img-2"
                      src="/images/icon/nav-icon-dark.svg"
                      alt="humberger menu"
                    />
                  </a>
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      <CurrencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(currency) => setSelectedCurrency(currency)}
      />

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
            {/* <Unsubscribe/> */}
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default Header;
