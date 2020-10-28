import React, { useEffect, useState } from "react";

import styles from "./LubricantRecommender.module.scss";

import Layout from "../../../components/Layout/Layout";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BLubricants } from "../../../api/b2b.api";

const LubricantRecommender = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BLubricants();

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
    <Layout pageTitle="Lube Recommender" withBottomPadding={false} backButton={true}>
      {currentPage && (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <iframe
              id="lube-recommender"
              style={{ height: "100vh", width: "100%" }}
              allowTransparency="true"
              frameBorder={0}
              className={styles.frame}
              title="Lube Recommender"
              src="http://engen.ewp.earlweb.net/"
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default LubricantRecommender;
