import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "./LubricantService.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BLubricants } from "../../../api/b2b.api";
import Tabs from "../../../components/Tabs";

const LubricantService = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

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

  useEffect(() => {
    if (currentPage && currentPage.sections && currentPage.sections.length) {
      setActiveTab(currentPage.sections[0]);
    }
  }, [currentPage]);

  const handleChangeActiveTab = value => {
    setActiveTab(currentPage.sections.find(({ slug }) => slug === value));
  };

  const tabs =
    currentPage && currentPage.sections && currentPage.sections.length
      ? currentPage.sections.map(({ slug, header_title }) => ({
          id: slug,
          value: slug,
          label: header_title,
        }))
      : [];

  return (
    <Layout pageTitle="Lubricants Service" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            {activeTab ? (
              <>
                <Tabs tabs={tabs} activeTab={activeTab.slug} action={handleChangeActiveTab} />
                <div
                  className={styles.tabContent}
                  dangerouslySetInnerHTML={{ __html: activeTab.description }}
                />
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default LubricantService;
