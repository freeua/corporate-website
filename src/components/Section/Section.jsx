import React from "react";
import LazyLoad from "react-lazyload";
import { ReactComponent as Logo } from "../../static/images/pdf-file-logo.svg";

import styles from "./Section.module.scss";
import ArrowIcon from "../icons/ArrowIcon";

const Section = ({
  section,
  imagePosition = "bottom",
  sectionImageFluid = false,
  pdfType = "default",
  growSection = "false",
  children,
  contain,
}) => {
  const {
    background_colour,
    image,
    slug,
    description,
    header_title,
    upload_pdf,
    columns,
  } = section;

  const boxShadow =
    background_colour === "default"
      ? {
          MozBoxShadow: "8px 25px 40px 0 rgba(0, 0, 0, 0.06)",
          WebkitBoxShadow: "8px 25px 40px 0 rgba(0, 0, 0, 0.06)",
          boxShadow: "8px 25px 40px 0 rgba(0, 0, 0, 0.06)",
        }
      : {
          MozBoxShadow: "unset",
          WebkitBoxShadow: "unset",
          boxShadow: "unset",
        };

  let backgroundColor;
  let titleColor;
  let color;

  switch (background_colour) {
    case "default":
      backgroundColor = "white";
      titleColor = "#5d5d5d";
      color = "rgba(93, 93, 93, 0.65)";
      break;
    case "grey":
      backgroundColor = "#e7e9ea";
      titleColor = "#5d5d5d";
      color = "rgba(93, 93, 93, 0.65)";
      break;
    case "blue":
      backgroundColor = "#002c90";
      titleColor = "white";
      color = "white";
      break;
    default:
      backgroundColor = "white";
      titleColor = "#5d5d5d";
      color = "rgba(93, 93, 93, 0.65)";
  }

  if (image && !description && !header_title) {
    return (
      <LazyLoad height={400} offset={100} once={true}>
        <div
          className={styles["section-image"]}
          style={{ width: `${columns ? (100 / 12) * columns : 50}%` }}>
          <img
            src={image.path}
            alt={slug}
            className={`${styles["section-image"]}`}
            style={contain && { objectFit: "contain", background: "#E6E8E9" }}
          />
        </div>
      </LazyLoad>
    );
  }

  return (
    <div
      className={`${styles.section} ${growSection === "true" ? styles.growSection : null}`}
      style={{
        backgroundColor,
        width: `${columns ? (100 / 12) * columns : 50}%`,
        ...boxShadow,
      }}>
      {imagePosition === "top" && image ? (
        <div className={styles["section-content-image"]}>
          <img src={image.path} alt={slug} className={`${styles["section-image"]}`} />
        </div>
      ) : null}
      <div className={styles.content}>
        {header_title && (
          <h3 style={{ color: titleColor }} className={styles["section-title"]}>
            {header_title}
          </h3>
        )}
        {description && (
          <div
            style={{
              color,
            }}
            className={`${styles["section-description"]} ${
              background_colour === "blue" ? styles.strongWhite : ""
            }`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {upload_pdf && upload_pdf.length
          ? upload_pdf.map(({ disk_name, file_name, title, path }) => {
              if (pdfType === "arrowIcon") {
                return (
                  <a
                    key={disk_name}
                    href={path}
                    download={file_name + ".pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.sectionsRightList} ${
                      background_colour === "blue" ? styles.pdfWhiteArrow : ""
                    }`}>
                    <p>{title}</p>
                    <ArrowIcon />
                  </a>
                );
              } else {
                return (
                  <a
                    key={disk_name}
                    href={path}
                    download={file_name + ".pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${background_colour === "blue" ? styles.pdfWhite : ""}  ${
                      styles["one-file"]
                    }`}>
                    <Logo />
                    <span>{title}</span>
                  </a>
                );
              }
            })
          : null}
        <div className={styles.sectionChild}>{children}</div>
      </div>
      {imagePosition === "bottom" && image ? (
        <div
          className={`${sectionImageFluid ? styles["section-image-fluid"] : null} ${
            styles["section-content-image"]
          } ${growSection === "true" ? styles.growSectionImage : null}`}>
          <img src={image.path} alt={slug} className={`${styles["section-image"]}`} />
        </div>
      ) : null}
    </div>
  );
};

export default Section;
