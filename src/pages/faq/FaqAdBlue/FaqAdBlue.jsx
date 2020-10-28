import React, { useState, useEffect } from "react";
import styles from "./FaqAdBlue.module.scss";

import Layout from "../../../components/Layout";
import NavigationBanner from "../../../components/NavigationBanner";

import { getAllB2BFaq } from "../../../api/b2b.api";
import { getFaqBySlug } from "../../../api/faq.api";

const FaqAdBlue = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [faq, setFaq] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BFaq();

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

  useEffect(() => {
    (async () => {
      try {
        const response = await getFaqBySlug(match.url.split("/")[2]);

        if (response.message === "success") {
          setFaq(response.data.faq);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [match.url]);

  return (
    <Layout pageTitle={`${currentPage ? currentPage.title : ""}`} backButton={true}>
      {currentPage && <NavigationBanner pages={pages} activePage={currentPage} />}
      {faq && (
        <section>
          {faq.description && (
            <div
              className={styles.tabContent}
              dangerouslySetInnerHTML={{ __html: faq.description }}
            />
          )}
        </section>
      )}
    </Layout>
  );
};

export default FaqAdBlue;
