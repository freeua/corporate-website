import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";

import styles from "./EngenCaresTransformation.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BEngenCares } from "../../../api/b2b.api";
import Section from "../../../components/Section";

const EngenCaresTransformation = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BEngenCares();

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
    <Layout pageTitle="Transformation" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            <Section section={sortedSection[0]} />
            <Section section={sortedSection[1]} pdfType="arrowIcon">
              {/* {sortedSection[1].upload_pdf && sortedSection[1].upload_pdf.length
                ? sortedSection[1].upload_pdf.map(({ file_name, path }) => (
                  <div className={`${sortedSection[2].background_colour === "blue" ? styles.pdfWhite : ""} ${styles.sectionsRightList}`}>
                      <p onClick={() => downloadFile(path, file_name)}>{file_name}</p>
                      <ArrowIcon />
                    </div>
                  ))
                : null} */}
            </Section>
            <Section section={sortedSection[2]} />
            <Section section={sortedSection[3]} />
            <Section section={sortedSection[4]} />
            <Section section={sortedSection[5]} pdfType="arrowIcon">
              {/* {sortedSection[5].upload_pdf && sortedSection[5].upload_pdf.length
                ? sortedSection[5].upload_pdf.map(({ file_name, path }) => (
                    <div className={`${sortedSection[5].background_colour === "blue" ? styles.pdfWhite : ""} ${styles.sectionsRightList}`}>
                      <p onClick={() => downloadFile(path, file_name)}>{file_name}</p>
                      <ArrowIcon />
                    </div>
                  ))
                : null} */}
            </Section>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default EngenCaresTransformation;
