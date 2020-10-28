import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Lubricants.module.scss";
import NavigationBanner from "../../components/NavigationBanner";
import { getAllB2BLubricants } from "../../api/b2b.api";
import Section from "../../components/Section";

const Lubricants = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BLubricants();

        if (response.message === "success") {
          setPages(response.data.b2b_all);
          setCurrentPage(
            response.data.b2b_all[
              response.data.b2b_all.findIndex(({ slug }) => slug.includes("main-page"))
            ]
          );
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const sortedSection =
    currentPage && currentPage.sections && currentPage.sections.length
      ? currentPage.sections.sort((a, b) => a.sort_order - b.sort_order)
      : [];

  return (
    <Layout pageTitle="Lubricants" withBottomPadding={false} withScrollToTop>
      {currentPage && (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <div className={styles.columnedBlock}>
              <Section section={sortedSection[0]} />
              <Section section={sortedSection[1]} />
              <Section section={sortedSection[2]} />
            </div>
            <div className={styles.columnedBlock}>
              <Section section={sortedSection[3]} />
              <Section section={sortedSection[4]} />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Lubricants;
