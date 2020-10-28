import React from "react";

import styles from "./SectionList.module.scss";

import Section from "../Section";

const SectionList = ({ sections, contain }) => {
  const sortedSection =
    sections && sections.length ? sections.sort((a, b) => a.sort_order - b.sort_order) : [];

  return (
    <div className={styles.wrapper}>
      {sortedSection.map(section => (
        <Section key={section.id} section={section} contain={contain} />
      ))}
    </div>
  );
};

export default SectionList;
