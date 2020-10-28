import React from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "../icons/ArrowIcon";
import styles from "./ArrowLink.module.scss";

export default ({ text, to, color }) => (
  <Link to={to} className={styles.ArrowLink}>
    <span style={{ color }}>{text}</span>
    <ArrowIcon color={color} pixelWeight="2" />
  </Link>
);
