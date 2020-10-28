import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./BackButton.module.scss";

import ArrowButton from "../ArrowButton";

const BackButton = ({ name = "back-button", onClick, isCookieAccepted, ...otherProps }) => {
  const history = useHistory();

  const returnToUrl = history.location.pathname
    .split("/")
    .slice(0, -1)
    .join("/");

  return (
    <div
      className={`${isCookieAccepted ? styles.cookieAccepted : ""} ${styles.wrapper}`}
      {...otherProps}>
      <div className={styles.back} onClick={() => history.push(returnToUrl)}>
        <ArrowButton color={["white"]} arrowDirection="left" name={name} />
      </div>
    </div>
  );
};

export default BackButton;
