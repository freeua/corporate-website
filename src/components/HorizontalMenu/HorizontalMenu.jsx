import React from "react";
import styles from "./HorizontalMenu.module.scss";

export default function HorizontalMenu({ items = [] }) {
  return (
    <div className={styles["horizontal-menu"]}>
      {items.map(item => (
        <HorizontalMenuItem item={item} />
      ))}
    </div>
  );
}

const HorizontalMenuItem = ({ item }) => {
  return (
    <div className={styles["horizontal-menu-item"]}>
      <span className={styles["horizontal-menu-item-name"]}>{item.name}</span>
      <div className={styles["horizontal-menu-item-read-more"]}>Read More</div>
    </div>
  );
};
