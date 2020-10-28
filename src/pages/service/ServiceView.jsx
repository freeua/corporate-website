import React, { useState, useEffect } from "react";

import styles from "./ServiceView.module.scss";

import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import SectionList from "../../components/SectionList";
import { getB2bBySlug } from "../../api/b2b.api";
import Banner from "../../components/Banner";
import { ReactComponent as Logo } from "../../static/images/pdf-file-logo.svg";

const ServiceView = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getB2bBySlug(match.params.slug);

        setCurrentPage(response.data.b2b);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [match.params.slug, match.url]);

  return (
    <Layout
      pageTitle={`${currentPage ? currentPage.title : ""}`}
      withBottomPadding={false}
      withScrollToTop>
      <Banner
        backgroundImage={currentPage && currentPage.image && currentPage.image.path}
        title={currentPage ? currentPage.header_title : ""}
      />
      <section className={styles.sections}>
        {currentPage ? (
          <>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: currentPage.description }}
            />
            <div className={styles.file}>
              {currentPage.file && (
                <a
                  key={currentPage.file.disk_name}
                  href={currentPage.file.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={currentPage.file.file_name + ".pdf"}
                  className={styles["one-file"]}>
                  <Logo />
                  <span>{currentPage.file.title}</span>
                </a>
              )}
            </div>
            {currentPage.sections && currentPage.sections && currentPage.sections.length ? (
              <SectionList sections={currentPage ? currentPage.sections : []} />
            ) : null}
          </>
        ) : (
          <Loader />
        )}
      </section>
    </Layout>
  );
};

export default ServiceView;
