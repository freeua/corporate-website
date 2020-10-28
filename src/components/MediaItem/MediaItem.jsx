import React from "react";
import { Link } from "react-router-dom";
import styles from "./MediaItem.module.scss";
import moment from "moment";
import ArrowIcon from "../icons/ArrowIcon";
import PlayButton from "../PlayButton";

const MediaItem = ({ post, page, mediaUrlSection, isSmall, imageFit = "cover" }) => {
  const { created_at, uploaded_date, slug, title, image, thumbnail } = post;

  const postImage = thumbnail ? thumbnail.path : image ? image.path : "";

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link
          to={`/${page}/${mediaUrlSection ? mediaUrlSection + "/" : ""}${slug}`}
          className={styles["img-wrapper"]}>
          <img className={styles.img} style={{ objectFit: imageFit }} src={postImage} alt={title} />
          {isSmall && (
            <div className={styles["play-btn"]}>
              <PlayButton isSmall={isSmall} />
            </div>
          )}
        </Link>

        <div className={styles.info}>
          <div className={styles.date}>
            {moment(uploaded_date || created_at).format("MMMM D, YYYY")}
          </div>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.slug}>
            <Link to={`/${page}/${mediaUrlSection ? mediaUrlSection + "/" : ""}${slug}`}>
              <div className={styles.read}>
                <span>Read</span>
                <ArrowIcon pixelWeight={2} margin="0px 0px 0px 20px" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaItem;
