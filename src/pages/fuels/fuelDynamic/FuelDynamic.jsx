import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";

import styles from "./FuelDynamic.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BFuels } from "../../../api/b2b.api";
import Section from "../../../components/Section";
import ArrowLink from "../../../components/ArrowLink";

const FuelDynamic = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BFuels();

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
    <Layout pageTitle="Engen Dynamic Diesel" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <Section section={sortedSection[0]}>
              <div>
                <ArrowLink
                  to="/faq"
                  text="FAQ's"
                  color={sortedSection[0].background_colour === "blue" ? "white" : "#002c90"}
                />
              </div>
            </Section>
            <Section section={sortedSection[1]} />
            <div className={styles.imageSideFlex}>
              <Section section={sortedSection[2]} />
              <div className={styles.sideContent}>
                <Section section={sortedSection[3]} />
                <Section section={sortedSection[4]} />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default FuelDynamic;
