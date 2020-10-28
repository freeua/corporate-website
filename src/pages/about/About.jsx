import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import NavigationBanner from "../../components/NavigationBanner";
import { getAllB2BAbout } from "../../api/b2b.api";
import SectionList from "../../components/SectionList";

const About = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BAbout();

        if (response.message === "success") {
          setPages(response.data.b2b_all);
          setCurrentPage(
            response.data.b2b_all[
              response.data.b2b_all.findIndex(({ slug }) => slug.includes("main-page"))
            ]
          );
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Layout pageTitle="About" withBottomPadding={false} withScrollToTop>
      {currentPage && (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <SectionList sections={currentPage.sections} />
        </>
      )}
    </Layout>
  );
};

export default About;
