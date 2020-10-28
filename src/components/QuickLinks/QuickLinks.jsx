import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./QuickLinks.module.scss";

import useXBreakpoint from "../../hooks/useXBreakpoint";

import Socials from "../Socials";
import ArrowIcon from "../icons/ArrowIcon";
import { getQuickLinks } from "../../api/menu.api";

const QuickLinks = () => {
  const [quickLinks, setQuickLinks] = useState([]);
  const socialsBreakpoint = useXBreakpoint(1024);

  useEffect(() => {
    (async () => {
      try {
        const response = await getQuickLinks();

        if (response.message === "success") {
          setQuickLinks(response.data.menu.menuitems);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.title} title`}>Quick Links</p>
      <div className={styles["links-column"]}>
        {quickLinks &&
          quickLinks.map(({ title, link_url }) => (
            <div key={link_url} className={styles["link-item"]}>
              <Link to={link_url}>
                <span>{title}</span>
                <ArrowIcon pixelWeight={2} />
              </Link>
            </div>
          ))}
      </div>

      <div className={styles.contacts}>
        <Link to="/contact" className={`${styles.title} ${styles.titleLink} title`}>
          Contact Details
        </Link>
        <div className={styles["contacts-info"]}>
          <p>General Switchboard: +27 27 403 4911</p>
          <p>
            Media Enquiries:
            <Link to="/media">Visit Media Page</Link>
          </p>
        </div>
      </div>
      <Socials iconSizes={socialsBreakpoint ? 20 : 34} />
    </div>
  );
};

export default QuickLinks;
