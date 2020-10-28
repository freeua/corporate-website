import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { ReactComponent as Logo } from "../../../static/images/pdf-file-logo.svg";
import styles from "./AboutValue.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BAbout } from "../../../api/b2b.api";
import Section from "../../../components/Section";

const AboutValue = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BAbout();

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
    <Layout pageTitle="About Value and Ethics" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <div className={styles.main}>
            {sortedSection &&
              sortedSection.map((section, index) => {
                if (index < 2) {
                  return <Section key={section.id} section={section} growSection="true" />;
                } else if (index === 2) {
                  return (
                    <div className={styles.download}>
                      <div className={styles.info}>
                        <h2>{section.header_title}</h2>
                        <div className={styles.files}>
                          {section.upload_pdf && section.upload_pdf.length
                            ? section.upload_pdf.map(({ disk_name, file_name, title, path }) => (
                                <a
                                  key={disk_name}
                                  href={path}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download={file_name + ".pdf"}
                                  className={styles["one-file"]}>
                                  <Logo />
                                  <span>{title}</span>
                                </a>
                              ))
                            : null}
                        </div>

                        <p
                          className={styles.note}
                          dangerouslySetInnerHTML={{ __html: section.description }}></p>
                      </div>
                    </div>
                  );
                } else {
                  return <Section key={section.id} section={section} />;
                }
              })}
          </div>
        </>
      ) : null}

      {/* // {downloadSection ? (
      //   <div className={styles.download}>
      //     <div className={styles.info}>
      //       <h2>{downloadSection.header_title}</h2>
      //       <div className={styles.files}>
      //         {downloadSection.upload_pdf && downloadSection.upload_pdf.length
      //           ? downloadSection.upload_pdf.map(({ file_name, path }) => (
      //               <p className={styles["one-file"]} onClick={() => downloadFile(path, file_name)}>
      //                 <Logo />
      //                 <span>{file_name}</span>
      //               </p>
      //             ))
      //           : null}
      //       </div>

      //       <p
      //         className={styles.note}
      //         dangerouslySetInnerHTML={{ __html: downloadSection.description }}></p>
      //     </div>
      //   </div>
      // ) : null} */}
    </Layout>
  );
};

export default AboutValue;
