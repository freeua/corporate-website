import React from "react";
import styles from "./Info.module.scss";

const Info = ({ label, children, color }) => {
  let textColor;

  switch (color) {
    case "blue":
      textColor = "#002c90";
      break;
    case "grey":
      textColor = "#5d5d5d";
      break;
    case "white":
      textColor = "white";
      break;
    default:
      textColor = "#5d5d5d";
  }

  return (
    <div className={styles.wrapper} style={{ color: textColor }}>
      <p className={styles["info-title"]}>{label}:</p>
      <div className={styles["info-text-wrapper"]}>{children}</div>
    </div>
  );
};

export default Info;
