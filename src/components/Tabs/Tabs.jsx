import React from "react";

import styles from "./Tabs.module.scss";

const Tabs = ({ tabs = [], activeTab, action, multi }) => (
  <div className={styles.block}>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {tabs.map(({ id, label, value }) => (
          <div
            key={id}
            className={`${styles.item} ${
              multi && activeTab.includes(value)
                ? styles.active
                : !multi && activeTab === value
                ? styles.active
                : ""
            }`}
            onClick={() => action(value)}>
            <span>{label}</span>
          </div>
        ))}
        <div className={styles.line} />
      </div>
    </div>
  </div>
);

export default Tabs;
