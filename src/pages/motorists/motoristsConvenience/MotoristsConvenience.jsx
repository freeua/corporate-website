import React, { useState, useEffect } from "react";

import Layout from "../../../components/Layout";
import NavigationBanner from "../../../components/NavigationBanner";

import { getAllB2BMotorists } from "../../../api/b2b.api";
import SectionList from "../../../components/SectionList";

const MotoristsConvenience = ({ match }) => {
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

  return (
    <Layout pageTitle="Convenience" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <SectionList sections={currentPage.sections} />
        </>
      ) : null}
    </Layout>
  );
};

export default MotoristsConvenience;
