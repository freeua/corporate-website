import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";

import styles from "./MotoristsAdblue.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BMotorists } from "../../../api/b2b.api";
import Section from "../../../components/Section";

import ContactUsContacts from "../../contact-us/ContactUsContacts";
import ArrowLink from "../../../components/ArrowLink";

const MotoristsAdblue = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BMotorists();

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
    <Layout pageTitle="Engen AdBlue" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <div className={styles.bodySections}>
              <div className={styles.bodySectionsFlex}>
                <div className={styles.overviewSection}>
                  <Section section={sortedSection[0]} />
                  <Section section={sortedSection[1]} />
                </div>
                <Section section={sortedSection[2]}>
                  <ArrowLink
                    to="/faq"
                    text="FAQ's"
                    color={sortedSection[2].background_colour === "blue" ? "white" : "#002c90"}
                  />
                </Section>
              </div>
              <div className={styles.bodySectionsFlex}>
                <Section section={sortedSection[3]} />
                <div className={styles.imageSectionContext}>
                  <Section section={sortedSection[4]} />
                  <Section section={sortedSection[5]} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "10rem" }}>
              <ContactUsContacts />
            </div>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default MotoristsAdblue;
