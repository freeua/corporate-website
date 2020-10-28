import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "./EngenCaresCsi.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BEngenCares } from "../../../api/b2b.api";
import Section from "../../../components/Section";

const EngenCaresCsi = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BEngenCares();

        if (response.message === "success") {
          setPages(response.data.b2b_all);
          setCurrentPage(response.data.b2b_all.find(b2b => b2b.link_url === match.url));
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [match.url]);

  const sortedSection =
    currentPage && currentPage.sections && currentPage.sections.length
      ? currentPage.sections.sort((a, b) => a.sort_order - b.sort_order)
      : [];

  return (
    <Layout pageTitle="Corporate Social Investment" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <div className={styles.bodySections}>
              <div className={styles.bodySectionsFlex}>
                <div className={styles.columnedBlock}>
                  <Section section={sortedSection[0]} />
                  <Section section={sortedSection[1]} />
                </div>

                <div className={styles.sectionsRight}>
                  <div className={styles.sectionsRightHealth}>
                    <Section section={sortedSection[2]} />
                    <Section section={sortedSection[3]} />
                  </div>
                  <div className={styles.sectionImage}>
                    <Section section={sortedSection[4]} />
                  </div>
                </div>
              </div>

              <div className={styles.bodySectionsFlex}>
                <div className={styles.sectionsLeftText}>
                  <Section section={sortedSection[5]} />
                  <Section section={sortedSection[6]} />
                </div>
                <Section section={sortedSection[7]} />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default EngenCaresCsi;
