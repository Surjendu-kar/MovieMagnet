import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import LottieAnimation from "../lottieAnimation/LottieAnimation";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //  whenever we change the location/page the scroll will starting from top
    window.scrollTo(0, 0);
  }, [location]);

  const controllNavbar = () => {
    // console.log(window.scrollY); // vertically check
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    // handle the scroll
    window.addEventListener("scroll", controllNavbar);
    return () => {
      window.removeEventListener("scroll", controllNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  useEffect(() => {
    //
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchQueryHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim().length > 0) {
      navigate(`/search/${query}`);
      // setTimeout(() => {
      //   setShowSearch(false);
      // }, 1000);
      setShowSearch(false);
    }
  };

  return (
    <header className={`header ${mobileMenu && "mobileView"} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          {/* <img src={logo} alt="" /> */}
          <LottieAnimation />
        </div>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => {
              navigate("/explore/movie");
              setMobileMenu(false);
            }}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigate("/explore/tv");
              setMobileMenu(false);
            }}
          >
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search Movie/TV show..."
                onChange={(event) => setQuery(event.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
