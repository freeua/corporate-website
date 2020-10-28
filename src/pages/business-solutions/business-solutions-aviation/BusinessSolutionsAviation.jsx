import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "./BusinessSolutionsAviation.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BIndustrials } from "../../../api/b2b.api";
import Section from "../../../components/Section";
import ArrowLink from "../../../components/ArrowLink";

const BusinessSolutionsAviation = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BIndustrials();

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
    <Layout pageTitle="Aviation" withBottomPadding={false}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <Section section={sortedSection[0]}>
              <ArrowLink
                to="/contact"
                text="Contact Us"
                color={sortedSection[0].background_colour === "blue" ? "white" : "#002c90"}
              />
              <ArrowLink
                to="/products"
                text="Product Database"
                color={sortedSection[0].background_colour === "blue" ? "white" : "#002c90"}
              />
            </Section>

            <Section section={sortedSection[1]} />
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default BusinessSolutionsAviation;
