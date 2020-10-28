import React from "react";

import styles from "./ArrowButton.module.scss";

const ArrowButton = ({
  name = "arrow-button",
  arrowDirection,
  className,
  style,
  onClick,
  color = [],
  disabled = false,
}) => {
  const buttonClassNames = [
    styles.button,
    ...(arrowDirection && color.includes("white") ? [styles["white"]] : []),

    className,
  ].join(" ");

  return (
    <button
      name={name}
      disabled={disabled}
      className={buttonClassNames}
      style={style}
      onClick={onClick}
      aria-label={name}>
      <i className={`${styles.arrow} ${styles[arrowDirection]}`} />
    </button>
  );
};

export default ArrowButton;
