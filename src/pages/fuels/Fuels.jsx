import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Fuels.module.scss";
import NavigationBanner from "../../components/NavigationBanner";
import { getAllB2BFuels } from "../../api/b2b.api";
import SectionList from "../../components/SectionList";

const Fuels = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BFuels();

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
    <Layout pageTitle="Our Fuels" withBottomPadding={false} withScrollToTop>
      {currentPage && (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <SectionList sections={currentPage.sections} contain={true} />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Fuels;
