import React from "react";
import { Link } from "react-router-dom";

import styles from "./MobileFooter.module.scss";

import LinkSection from "./LinkSection";
import Socials from "../../Socials";
import NearestStation from "../../NearestStation";
import useXBreakpoint from "../../../hooks/useXBreakpoint";

const MobileFooter = ({ menu }) => {
  const isMobile = useXBreakpoint(678);

  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles["nav-container"]}>
          <nav className={styles.nav}>
            {menu &&
              menu.map(({ title, link_url, children }) => (
                <LinkSection
                  key={link_url + title}
                  title={title}
                  linkUrl={link_url}
                  links={children}
                />
              ))}
          </nav>
          {!isMobile && <NearestStation width={"335px"} height={"240px"} />}
        </div>
        <div className={styles.socials}>
          <Socials iconSizes={20} />
        </div>
        <div className={styles.copyright}>
          <p>
            <Link to="/services/terms-conditions">
              <span className={styles["copyright-link"]}>Terms of use</span>
            </Link>
          </p>
          <p className={styles["copyright-text"]}>
            <b>Copyright</b> &copy;{new Date().getFullYear()} ENGEN PETROLEUM LTD - All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
