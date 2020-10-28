import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./MainMenu.module.scss";
import { getHomepageMenu } from "../../api/menu.api";

const MainMenu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getHomepageMenu();

        if (response.message === "success") {
          setMenu(response.data.menu.menuitems.sort((a, b) => a.sort_order - b.sort_order));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.wrapper}>
      {menu &&
        menu.map(({ title, link_url }) => {
          if (link_url.includes("http")) {
            return (
              <a key={link_url} rel="noopener noreferrer" target="_blank" href={link_url}>
                <div className={styles.item}>
                  <span className={`${styles.link} text`}>{title}</span>
                  <span className={styles.arrow} />
                </div>
              </a>
            );
          }

          return (
            <Link key={link_url} to={link_url}>
              <div className={styles.item}>
                <span className={`${styles.link} text`}>{title}</span>
                <span className={styles.arrow} />
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default MainMenu;
