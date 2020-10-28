import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./DesktopNavigation.module.scss";

import QuickLinks from "../../QuickLinks/QuickLinks";
import ArrowIcon from "../../icons/ArrowIcon";

const DesktopNavigation = ({ menu }) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (menu && menu.length) {
      setActiveSection(menu[0]);
    }
  }, [menu]);

  const handleSetSection = section => () => {
    if (section.title !== activeSection.title) {
      setActiveSection(section);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["navigation-wrapper"]}>
        <div className={styles["navigation-wrapper--inner"]}>
          <div className={styles["nav-left"]}>
            {menu && menu.length
              ? menu.map(section => {
                  if (section.link_url.includes("http")) {
                    return (
                      <a
                        href={section.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={section.title + section.link_url}
                        className={`${styles.title} title`}
                        onMouseOver={handleSetSection(section)}>
                        {section.title}
                        <ArrowIcon pixelWeight={2} size={4} margin="0px 0px 2px 20px" />
                      </a>
                    );
                  }

                  return (
                    <Link
                      to={section.link_url}
                      key={section.title + section.link_url}
                      className={`${styles.title} title`}
                      onMouseOver={handleSetSection(section)}>
                      {section.title}
                      <ArrowIcon pixelWeight={2} size={4} margin="0px 0px 2px 20px" />
                    </Link>
                  );
                })
              : null}
          </div>
          {/*end of nav-left*/}

          {activeSection && (
            <div className={styles["nav-right"]}>
              {/* <div>
                <Link to={activeSection.link_url} className={`${styles.title} title`}>
                  {activeSection.title}
                </Link>
              </div>
              <div
                className={styles["nav-text"]}
                dangerouslySetInnerHTML={{ __html: activeSection.description }}
              /> */}
              <div className={styles["nav-columns--wrapper"]}>
                <div className={styles["nav-column"]}>
                  {activeSection &&
                    activeSection.children &&
                    activeSection.children.map(({ title, link_url }) => (
                      <div key={title + link_url} className={styles["link-wrapper"]}>
                        <Link key={link_url + title} to={link_url} className="title">
                          {title}
                          <ArrowIcon pixelWeight={2} margin="3px 0px 0px 20px" />
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
              {/*end of nav-right*/}
            </div>
          )}

          {/*end of wrapper-inner*/}
        </div>
      </div>
      {/*end of navigaton-wrapper*/}
      <div className={styles["quick-links-wrapper"]}>
        <QuickLinks />
      </div>
    </div>
  );
};

export default DesktopNavigation;
