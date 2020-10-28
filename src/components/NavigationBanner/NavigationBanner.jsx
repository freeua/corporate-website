import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavigationBanner.module.scss";
import ArrowIcon from "../icons/ArrowIcon";
import { ReactComponent as PdfLogo } from "../../static/images/pdf-file-logo.svg";
import useXBreakpoint from "../../hooks/useXBreakpoint";

const NavigationBanner = ({ activePage, pages }) => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [imgLoaded, setImageLoaded] = useState(false);

  const isMobile = useXBreakpoint(1150);
  const isHugeScreen = useXBreakpoint(1850);

  useEffect(() => {
    setHoveredSection(activePage);
  }, [activePage]);

  const onHoverSetSection = section => () => !isMobile && setHoveredSection(section);

  const onHoverLeaveSetSection = () => () => !isMobile && setHoveredSection(activePage);

  const mainPage = pages.findIndex(({ slug }) => slug.includes("main-page"));

  const title = hoveredSection ? hoveredSection.header_title : pages[mainPage].header_title;
  const description = hoveredSection ? hoveredSection.description : pages[mainPage].description;
  const backgroundImage =
    activePage && activePage.image && activePage.image.path
      ? activePage.image.path
      : pages[mainPage].image && pages[mainPage].image.path
      ? pages[mainPage].image.path
      : "";
  let indexLink = 20;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperImg}>
        <img
          onLoad={() => setImageLoaded(true)}
          className={`${styles.background} ${imgLoaded ? styles.faded : ""}`}
          src={backgroundImage}
          alt={title}
        />
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.navigation}>
        {description && (
          <div
            style={{
              maxWidth: isMobile
                ? "100vw"
                : !isHugeScreen
                ? "60vw"
                : description.length > 800
                ? `${description.length / (activePage.file ? 10 : 16)}vw`
                : "60rem",
            }}
            className={styles.description}>
            <p
              className={styles["description-text"]}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            {activePage.file && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={activePage.file.path}
                download={activePage.file.file_name + ".pdf"}
                className={styles["one-file"]}>
                <PdfLogo />
                <span>{activePage.file.title}</span>
              </a>
            )}
          </div>
        )}
        <div className={styles.links}>
          {pages
            .filter(({ id }) => id !== pages[mainPage].id)
            .map((page, index) => {
              if (!page.link_url.includes("http")) {
                return (
                  <div
                    activeClassName={styles["nav-active"]}
                    key={page.link_url}
                    style={{ zIndex: indexLink - index }}
                    className={`
                  ${styles["nav-item"]} ${
                      hoveredSection && hoveredSection.link_url === page.link_url
                        ? styles["nav-active"]
                        : ""
                    }
                   `}
                    onMouseEnter={onHoverSetSection(page)}
                    onMouseLeave={onHoverLeaveSetSection()}>
                    <NavLink
                      to={page.link_url}
                      className={`${styles["link-label-a"]} ${styles["link-hover-a"]}`}>
                      <p className={styles["link-label"]}>{page.header_title}</p>
                    </NavLink>
                    <div className={styles["link-read"]}>
                      <NavLink to={page.link_url} className={styles["link-hover-a"]}>
                        <span>Read More</span>
                        <ArrowIcon />
                      </NavLink>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    activeClassName={styles["nav-active"]}
                    key={page.link_url}
                    style={{ zIndex: indexLink - index }}
                    className={`
                  ${styles["nav-item"]} ${
                      hoveredSection && hoveredSection.link_url === page.link_url
                        ? styles["nav-active"]
                        : ""
                    }
                `}
                    onMouseEnter={onHoverSetSection(page)}
                    onMouseLeave={onHoverLeaveSetSection()}>
                    <a
                      key={page.link_url}
                      rel="noopener noreferrer"
                      target="_blank"
                      href={page.link_url}
                      className={`${styles["link-label-a"]} ${styles["link-hover-a"]}`}>
                      <p className={styles["link-label"]}>{page.header_title}</p>
                    </a>
                    <div className={styles["link-read"]}>
                      <a
                        key={page.link_url}
                        rel="noopener noreferrer"
                        target="_blank"
                        href={page.link_url}
                        className={styles["link-hover-a"]}>
                        <span>Read More</span>
                        <ArrowIcon />
                      </a>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default NavigationBanner;
