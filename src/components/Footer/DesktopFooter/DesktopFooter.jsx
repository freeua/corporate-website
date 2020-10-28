import React from "react";
import { Link } from "react-router-dom";

import styles from "./DesktopFooter.module.scss";
import Socials from "../../Socials";
import NearestStation from "../../NearestStation";

const DesktopFooter = ({ menu }) => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles["footer-navigation-block"]}>
          <nav className={styles.nav}>
            {menu &&
              menu.map(menu => (
                <ul key={menu.link_url + menu.title} className={styles["link-list"]}>
                  <li>
                    <Link to={menu.link_url}>
                      <p className={styles["parent-link"]}>{menu.header_title}</p>
                    </Link>
                  </li>
                  {menu.children && menu.children.length
                    ? menu.children.map(({ header_title, link_url }) => {
                        if (!link_url.includes("http")) {
                          return (
                            <li key={link_url + header_title}>
                              <Link to={link_url}>
                                <p className={styles["child-link"]}>{header_title}</p>
                              </Link>
                            </li>
                          );
                        } else {
                          return (
                            <li key={link_url + header_title}>
                              <a href={link_url}>
                                <p className={styles["child-link"]}>{header_title}</p>
                              </a>
                            </li>
                          );
                        }
                      })
                    : null}
                </ul>
              ))}
          </nav>
          <div className={styles.contacts}>
            <div className={styles.details}>
              <div className={styles["parent-link"]}>Contact Details</div>
              <div className={styles["detail-item"]}>
                <span className={styles["detail-description"]}>General Switchboard:</span>{" "}
                <a className={styles["detail-description"]} href="tel:+27-27-403-4911">
                  +27 27 403 4911
                </a>
              </div>
              <div className={styles["detail-item"]}>
                <span className={styles["detail-description"]}>Media Enquiries:</span>{" "}
                <Link to="/media">
                  <span className={styles["underline-link"]}>Visit Media Page</span>
                </Link>
              </div>
              <div className={styles["detail-item"]}>
                <span className={styles["detail-description"]}>Contact Details:</span>{" "}
                <Link to="/contact">
                  <span className={styles["underline-link"]}>Visit Contact Us Page</span>
                </Link>
              </div>
            </div>
            <Socials />
            <div className={styles["office-location-block"]}>
              <div className={styles["office-location-title"]}>
                <p className={styles["parent-link"]}>Nearest Office</p>
                <Link to="/contact">
                  <span className={styles["child-link"]}>View Details</span>
                </Link>
              </div>
              <NearestStation width={"335px"} height={"240px"} />
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            <Link to="/services/terms-conditions">
              <span className={styles["copyright-link"]}>terms of use</span>
            </Link>
            {" | "}
            <Link to="/services/paia">
              <span className={styles["copyright-link"]}>paia</span>
            </Link>
            {" | "}
            <Link to="/services/privacy-notice">
              <span className={styles["copyright-link"]}>privacy policy</span>
            </Link>
          </p>
          <p className={styles["copyright-text"]}>
            <b>Copyright</b> &copy;{new Date().getFullYear()} Engen Petroleum LTD - All RIghts
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
