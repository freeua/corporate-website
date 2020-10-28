import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "./MotoristsFranchising.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BMotorists } from "../../../api/b2b.api";
import Section from "../../../components/Section";
import Button from "../../../components/buttons/Button";

const MotoristsFranchising = ({ match }) => {
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
    <Layout pageTitle="Franchising" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <Section section={sortedSection[0]} />
            <Section section={sortedSection[1]}>
              <a
                style={{ display: "block", marginTop: "7rem" }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://engen-franchise.erecruit.co/candidateapp/Jobs/Browse">
                <Button text="Franchise Opportunities" />
              </a>
            </Section>
            <Section section={sortedSection[2]} imagePosition="top" />
            <Section section={sortedSection[3]} />
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default MotoristsFranchising;
