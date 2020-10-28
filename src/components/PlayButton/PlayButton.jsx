import React from "react";
import styles from "./PlayButton.module.scss";

export default function PlayButton({ isSmall }) {
  return <div className={`${styles["play-btn"]} ${isSmall ? styles["small"] : ""}`}></div>;
}
