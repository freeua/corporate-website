import React from "react";
import styles from "./Card.module.scss";

const Card = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Card;
