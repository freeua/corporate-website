import React, { useState } from "react";
import styles from "./Banner.module.scss";

const Banner = ({ title, backgroundImage, underTitle }) => {
  const [imgLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles[underTitle ? "wrapper-with-under-title" : "wrapper"]}>
      <div className={styles.wrapperImg}>
        <img
          onLoad={() => setImageLoaded(true)}
          className={`${styles.background} ${imgLoaded ? styles.faded : ""}`}
          src={backgroundImage}
          alt={title}
        />
        <h1 className={styles.title}>{title}</h1>
      </div>
      {underTitle && (
        <div className={styles["under-title"]}>
          <span>{underTitle}</span>
        </div>
      )}
    </div>
  );
};

export default Banner;
