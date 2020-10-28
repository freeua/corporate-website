import React, { useState, useEffect, useRef } from "react";

import styles from "./CuttedCarouselItem.module.scss";

const CuttedCarouselItem = ({
  person: { description, title, header_title, image },
  activePost,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    setShowDescription(false);
  }, [activePost]);

  useEffect(() => {
    if (descriptionRef.current && descriptionRef.current.offsetHeight < 120) {
      setShowDescription(true);
    }
  }, [descriptionRef]);

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${activePost ? styles["active-wrapper"] : ""}`}>
        {activePost ? (
          <div
            className={`${styles["img-wrapper"]} ${
              activePost ? styles["active-img-wrapper"] : ""
            }`}>
            <img className={styles.img} src={image && image.path ? image.path : ""} alt={title} />
          </div>
        ) : (
          <div
            className={`${styles["img-wrapper"]} ${
              activePost ? styles["active-img-wrapper"] : ""
            }`}>
            <img className={styles.img} src={image && image.path ? image.path : ""} alt={title} />
          </div>
        )}

        <div className={styles.textBlock}>
          <div>
            <div className={`${styles.name} ${activePost ? styles["active-name"] : ""}`}>
              {title}
            </div>
            <div className={styles.position}>{header_title}</div>
          </div>
          {activePost && (
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                maxHeight: showDescription ? "unset" : 120,
              }}>
              <div
                style={{ maxHeight: showDescription ? "unset" : 120 }}
                className={styles.description}>
                <div ref={descriptionRef} dangerouslySetInnerHTML={{ __html: description }} />
              </div>
              <div
                onClick={() => setShowDescription(true)}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  boxShadow: showDescription ? "unset" : "white 0px -35px 30px -10px inset",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CuttedCarouselItem;
