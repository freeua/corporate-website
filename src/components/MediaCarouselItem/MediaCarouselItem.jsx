import React from "react";
import { Link } from "react-router-dom";
import image1 from "../../static/images/news-page-img1.png";
import styles from "./MediaCarouselItem.module.scss";

import moment from "moment";
import ArrowIcon from "../icons/ArrowIcon";
import PlayButton from "../PlayButton";

const MediaCarouselItem = ({ post, page, activePost, tag, isSmall }) => {
  const { created_at, uploaded_date, slug, title, image } = post;

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${activePost ? styles["active-wrapper"] : ""}`}>
        {activePost ? (
          <Link
            to={`/${page}/${tag}/${slug}`}
            className={`${styles["img-wrapper"]} ${
              activePost ? styles["active-img-wrapper"] : ""
            }`}>
            <img
              className={styles.img}
              src={image && image.path ? image.path : image1}
              alt={title}
            />
            {isSmall && (
              <div className={styles["play-btn"]}>
                <PlayButton isSmall={isSmall} />
              </div>
            )}
          </Link>
        ) : (
          <div
            className={`${styles["img-wrapper"]} ${
              activePost ? styles["active-img-wrapper"] : ""
            }`}>
            <img
              className={styles.img}
              src={image && image.path ? image.path : image1}
              alt={title}
            />
            {isSmall && (
              <div className={styles["play-btn"]}>
                <PlayButton isSmall={isSmall} />
              </div>
            )}
          </div>
        )}

        {created_at && title && (
          <div className={styles.info}>
            {created_at && (
              <div className={styles.date}>
                {moment(uploaded_date || created_at).format("MMMM D, YYYY")}
              </div>
            )}
            {title && <div className={styles.title}>{title}</div>}
            {title && (
              <div className={styles.slug}>
                {activePost && (
                  <Link to={`/${page}/${tag}/${slug}`}>
                    <div className={styles.read}>
                      <span>Read</span>
                      <ArrowIcon pixelWeight={2} margin="0px 0px 0px 20px" />
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaCarouselItem;
