import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";

import styles from "./EngenCaresSustainability.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BEngenCares } from "../../../api/b2b.api";
import Section from "../../../components/Section";

const EngenCaresSustainability = ({ match }) => {
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
    <Layout pageTitle="Sustainability" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <div className={styles.columnedBlock}>
              <Section section={sortedSection[0]} />
              <Section section={sortedSection[1]} />
              <Section section={sortedSection[2]} pdfType="arrowIcon" />
            </div>
            <Section section={sortedSection[3]} />
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default EngenCaresSustainability;
