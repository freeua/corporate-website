import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";

import styles from "./AboutSupply.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BAbout } from "../../../api/b2b.api";
import SectionList from "../../../components/SectionList";

const AboutSupply = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BAbout();

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

  return (
    <Layout pageTitle="About Supply and Directorate" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <SectionList sections={currentPage.sections} />
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default AboutSupply;
