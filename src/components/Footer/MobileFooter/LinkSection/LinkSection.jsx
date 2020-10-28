import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./LinkSection.module.scss";

const LinkSection = ({ title, linkUrl, links }) => {
  const [active, setActive] = useState(false);
  const activeClass = active && styles["active"];

  const handleToggle = () => () => setActive(!active);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {linkUrl.includes("http") ? (
          <a href={linkUrl} rel="noopener noreferrer" target="_blank">
            {title}
          </a>
        ) : (
          <Link to={linkUrl}>{title}</Link>
        )}
        {links && links.length ? (
          <div style={{ width: 30, textAlign: "center" }}>
            <i
              onClick={handleToggle()}
              className={`${styles.arrow} ${styles[active ? "up" : "down"]}`}></i>
          </div>
        ) : null}
      </div>
      <div className={`${styles["container"]} ${activeClass}`}>
        {links &&
          links.map(({ link_url, title }) => (
            <Link key={link_url + title} to={link_url}>
              <p className={styles.item}>{title}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default LinkSection;
