import React, { useState, useEffect } from "react";

import { getAllB2BFaq } from "../../api/b2b.api";

import Layout from "../../components/Layout";
import NavigationBanner from "../../components/NavigationBanner";

const Faq = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BFaq();

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
    <Layout pageTitle="FAQ's" withBottomPadding={false}>
      {currentPage ? <NavigationBanner pages={pages} activePage={currentPage} /> : null}
    </Layout>
  );
};

export default Faq;
