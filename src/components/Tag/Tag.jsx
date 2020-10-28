import React from "react";

import styles from "./Tag.module.scss";

const Tag = ({ text = "", isActive, onClick, children, ...otherProps }) => (
  <div onClick={onClick} className={`${isActive ? styles.active : ""} ${styles.wrapper}`}>
    {text ? <span className={styles.text}>{text}</span> : null}
    {children}
  </div>
);

export default Tag;
