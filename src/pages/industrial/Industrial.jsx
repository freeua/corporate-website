import React, { useState, useEffect } from "react";

import { getAllB2BIndustrials } from "../../api/b2b.api";

import Layout from "../../components/Layout";
import NavigationBanner from "../../components/NavigationBanner";
import SectionList from "../../components/SectionList";

import styles from "./Industrial.module.css";

const Industrial = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BIndustrials();

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

  return (
    <Layout pageTitle="Business Solutions" withBottomPadding={false}>
      {currentPage && (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <SectionList sections={currentPage.sections} />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Industrial;
