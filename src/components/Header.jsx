import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavProfile from "./NavProfile";
import { useUser } from "../context/UserContext";
import Sidebar from "./Sidebar";
import logo from "../assets/education_logo.png";

const Header = ({ logout }) => {
  const { userData } = useUser();

  const handleLogout = () => {
    // Call the logout function passed as a prop
    logout();
  };

  // console.log("User data:", userData);

  return (
    <>
      {/* <!-- Header comment --> */}
      <header id="header-demo" className="header">
        <nav className="navbar navbar-expand-sm bg-body-tertiary bsb-navbar-3 fixed-top">
          <div className="container">
            <Link className="navbar-brand d-sm-none" to="/home">
              <img src={logo} alt="logo" height={50} />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#bsbNavbar"
              aria-controls="bsbNavbar"
              aria-label="Toggle Navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="bsbNavbar"
              aria-labelledby="bsbNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="bsbNavbarLabel">
                  Menu
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body mt-1">
                <ul className="navbar-nav  d-flex gap-4 ">
                  <li className="nav-item me-3">
                    <a
                      className="nav-link"
                      href="#!"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#bsbSidebar1"
                      aria-controls="bsbSidebar1"
                    >
                      <i className="bi-filter-left fs-3 lh-1"></i>
                    </a>
                  </li>
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link fw-medium"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    className="nav-item fw-medium"
                    data-bs-dismiss="offcanvas"
                  >
                    <Link className="nav-link" aria-current="page" to="/about">
                      About
                    </Link>
                  </li>
                  <li
                    className="nav-item fw-medium "
                    data-bs-dismiss="offcanvas"
                  >
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </li>

                  <li className="nav-item fw-medium d-sm-none">
                    {" "}
                    {/* Only display on small screens */}
                    <Link
                      to="/signin"
                      className="btn my-btn2 w-50 nav-link"
                      onClick={handleLogout}
                    >
                      Sign out
                    </Link>
                    {/* this is button to open nav profile in mobile  */}
                    {/* <button
                      className="navbar-toggler border-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#bsbNavbar"
                      aria-controls="bsbNavbar"
                      aria-label="Toggle Navigation"
                    >
                      <i className="bi bi-three-dots"></i>
                    </button> */}
                  </li>
                </ul>
              </div>
            </div>

            <NavProfile logout={logout} />

            {/* New code added  */}

            {/* <button
              class="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#bsbNavbar"
              aria-controls="bsbNavbar"
              aria-label="Toggle Navigation"
            >
              <i class="bi bi-three-dots"></i>
            </button> */}

            {/* <div className="navbar-nav ms-auto header-btn d-none d-sm-flex">
              {" "}
              Hide on small screens
              <Link to="/signin" className="btn my-btn2" onClick={handleLogout}>
                Sign out
              </Link>
            </div> */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
