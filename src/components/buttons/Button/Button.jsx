import React from "react";
import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const Button = ({
  type = "button",
  name = "button",
  text,
  href,
  onClick,
  classes,
  addStyle,
  ...otherProps
}) => {
  const classNames = [
    styles.button,
    styles.addStyle,
    ...(classes && classes.includes("white") ? [styles["white"]] : []),
  ].join(" ");

  if (href) {
    return (
      <Link
        to={href}
        className={classNames}
        type={type}
        name={name}
        aria-label={name}
        onClick={onClick}
        {...otherProps}>
        {text}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={type}
      name={name}
      aria-label={name}
      onClick={onClick}
      {...otherProps}>
      {text}
    </button>
  );
};

export default Button;
