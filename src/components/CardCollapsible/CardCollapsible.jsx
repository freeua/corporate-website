import React, { useState } from "react";

import styles from "./CardCollapsible.module.scss";

const CardCollapsible = ({ title, children }) => {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav} onClick={() => setIsCollapse(!isCollapse)}>
        <div className={styles.title}>{title}</div>
        <b>{!isCollapse ? "+" : "-"}</b>
      </div>
      {isCollapse && <div className={styles.main}>{children}</div>}
    </div>
  );
};

export default CardCollapsible;
