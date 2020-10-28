import React from "react";
import { Link } from "react-router-dom";

import styles from "./PromotionItem.module.scss";
import PlayButton from "../PlayButton";

const PromotionItem = ({ promotion, isFullSrceen, isPlayButton }) => {
  const { title, thumbnail, image } = promotion;

  const promotionImage = thumbnail ? thumbnail.path : image ? image.path : "";

  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={promotionImage} alt={title} />
      <div className={`${styles.content} ${isFullSrceen ? styles.fullSrceen : ""}`}>
        {title && <h2 className={`${styles.title} title`}>Promotions</h2>}
        <Link to={`promotions`}>
          <div className={styles.item}>
            <p className={styles["link-wrapper"]}>
              <span className={`${styles.link} text`}>Read More</span>
              <span className={styles.arrow} />
            </p>
          </div>
        </Link>
        {isPlayButton ? <PlayButton /> : ""}
      </div>
    </div>
  );
};

export default PromotionItem;
