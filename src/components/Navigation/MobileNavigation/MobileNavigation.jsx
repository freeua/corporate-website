import React from "react";
// import { Link } from "react-router-dom";

import styles from "./MobileNavigation.module.scss";
import LinkSection from "../../Footer/MobileFooter/LinkSection";
import Socials from "../../Socials";

const MobileNavigation = ({ menu }) => (
  <div className={styles.wrapper}>
    {menu &&
      menu.map(({ title, children, link_url }) => (
        <LinkSection key={title + link_url} title={title} links={children} linkUrl={link_url} />
      ))}
    <div className={styles["mob-nav-socials"]}>
      <Socials iconSizes={20} />
    </div>
  </div>
);

export default MobileNavigation;
