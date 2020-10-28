import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";

import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BEngenCares } from "../../../api/b2b.api";
import SectionList from "../../../components/SectionList";

const EngenCaresSponsorship = ({ match }) => {
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

  return (
    <Layout pageTitle="Sponsorship" withBottomPadding={false} backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <SectionList sections={currentPage.sections} />
          {/* <div className={styles.main}>
            <div className={styles.bodySections}>
              <div className={styles.bodySectionsFlex}>
                <div className={styles.sectionsLeftText}>
                  <Section section={sortedSection[0]} />
                  <Section section={sortedSection[1]} />
                </div>

                <Section section={sortedSection[2]} />
              </div>

              <div className={styles.bodySectionsFlex}>
                <Section section={sortedSection[3]} />

                <div className={styles.sectionsRightText}>
                  <Section section={sortedSection[4]} />
                  <Section section={sortedSection[5]} />
                  <Section section={sortedSection[6]} />
                </div>
              </div>
            </div>
          </div> */}
        </>
      ) : null}
    </Layout>
  );
};

export default EngenCaresSponsorship;
