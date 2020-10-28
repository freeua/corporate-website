import React, { useState, useEffect } from "react";

import styles from "./FaqEngenDynamic.module.scss";

import Layout from "../../../components/Layout";
import NavigationBanner from "../../../components/NavigationBanner";

import { getAllB2BFaq } from "../../../api/b2b.api";
import { getFaqBySlug } from "../../../api/faq.api";
import Tabs from "../../../components/Tabs";

const FaqEngenDynamic = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [faq, setFaq] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

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
          setActiveTab("benefits");
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [match.url]);

  const handleChangeActiveTab = value => {
    setActiveTab(value);
  };

  const tabs = faq && [
    {
      id: "benefits",
      value: "benefits",
      label: "Benefits",
    },
    {
      id: "suitability",
      value: "suitability",
      label: "Suitability",
    },
    {
      id: "technical",
      value: "technical",
      label: "Technical",
    },
    {
      id: "quality And Performance",
      value: "quality And Performance",
      label: "Quality And Performance",
    },
  ];

  return (
    <Layout pageTitle={`${currentPage ? currentPage.title : ""}`} backButton={true}>
      {currentPage && <NavigationBanner pages={pages} activePage={currentPage} />}
      {activeTab && (
        <section className={styles.tabs}>
          <div className={styles.tabsWrapper}>
            <Tabs tabs={tabs} activeTab={activeTab} action={handleChangeActiveTab} />
            <div
              className={styles.tabContent}
              dangerouslySetInnerHTML={{ __html: faq[activeTab] }}
            />
          </div>
        </section>
      )}
    </Layout>
  );
};

export default FaqEngenDynamic;
