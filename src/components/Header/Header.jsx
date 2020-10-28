import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./Header.module.scss";

import Navigation from "../Navigation";
import CookieNotification from "../CookieNotification";
import { EngenLogo, SearchIcon } from "../icons";
import StationSearch from "../StationSearch";
import BackButton from "../buttons/BackButton";
import useXBreakpoint from "../../hooks/useXBreakpoint";

const Header = ({ backButton }) => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [isCookieAccepted, setIsCookieAccepted] = useState(true);

  const isMobile = useXBreakpoint(769);

  const history = useHistory();

  const handleToggleNavigation = () => () => setShowNavigation(!showNavigation);

  if (showNavigation) {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "unset";
  }

  const isCookieAccept = Cookie.get("cookie-accept");

  useEffect(() => {
    if (isCookieAccept) {
      setIsCookieAccepted(true);
    } else {
      setIsCookieAccepted(false);
    }
  }, [isCookieAccept]);

  const handleAcceptCookie = () => {
    setIsCookieAccepted(true);
  };

  const handleLogoClick = () => () => {
    history.push("/");
    window.scrollTo(0, 0);
    setShowNavigation(false);
  };

  return (
    <>
      <CookieNotification onAccept={handleAcceptCookie} />
      <header className={`${styles.wrapper} ${!isCookieAccepted ? styles["cookie-accepted"] : ""}`}>
        <div className={styles.left}>
          <div onClick={handleLogoClick()}>
            <div className={styles["logo-block"]}>
              <EngenLogo />
            </div>
          </div>
          {backButton && <BackButton isCookieAccepted={isCookieAccepted} />}
        </div>

        {!isMobile && (
          <div className={styles["search-block"]}>
            <StationSearch />
          </div>
        )}

        <div className={styles.right}>
          <div className={styles["action-block"]}>
            <a
              href="https://www.petronas.com/"
              className={styles.linkActionBlock}
              target="_blank"
              rel="noopener noreferrer">
              <div className={styles["petronas-background"]} />
            </a>
            <Link to="/search" className={styles["action-item"]}>
              <div className={styles["search-icon"]}>
                <SearchIcon />
              </div>
            </Link>
            <div className={styles["action-item"]} onClick={handleToggleNavigation()}>
              {!showNavigation ? (
                <div className={styles.burger} />
              ) : (
                <div className={styles.close}>&#10005;</div>
              )}
            </div>
          </div>
        </div>
      </header>

      {isMobile && (
        <div
          className={`${styles["search-block-mobile"]} ${
            !isCookieAccept ? styles["cookie-accepted"] : ""
          } ${backButton ? styles.backButton : ""}`}>
          <StationSearch />
        </div>
      )}

      <CSSTransition
        in={showNavigation}
        timeout={300}
        classNames="navigation"
        mountOnEnter
        unmountOnExit>
        <Navigation />
      </CSSTransition>
    </>
  );
};

export default Header;
