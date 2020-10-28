import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";

import styles from "./EngenCaresHseq.module.scss";

import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BEngenCares } from "../../../api/b2b.api";
import Section from "../../../components/Section";

const EngenCaresHseq = ({ match }) => {
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
    <Layout pageTitle="HSEQ" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <Section section={sortedSection[0]} />
            <div className={styles.columnedBlock}>
              <Section section={sortedSection[1]} />
              <Section section={sortedSection[2]} />
            </div>
            <Section section={sortedSection[3]} />

            <Section section={sortedSection[4]} />
            <Section section={sortedSection[5]} />
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default EngenCaresHseq;
