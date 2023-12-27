import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import logo from "../../assets/movix-logo.svg";
import ContentWrapper from "../contentWrapper/ContentWrapper";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  return (
    <header className={`header ${mobileMenu && "mobileView"}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigate("")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigate("")}>
            TV Shows
          </li>
          <li className="menuItem" onClick={() => navigate("")}>
            <HiOutlineSearch />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch />
          {mobileMenu ? (
            <VscChromeClose onClick={openSearch} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Header;
