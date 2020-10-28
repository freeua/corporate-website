import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "./LubricantProducts.module.scss";
import NavigationBanner from "../../../components/NavigationBanner";
import { getAllB2BLubricants } from "../../../api/b2b.api";
import { getAllTags } from "../../../api/products.api";
import Button from "../../../components/buttons/Button";
import LubricantProductsListDesktop from "./LubricantProductsListDesktop";
import LubricantProductsListMobile from "./LubricantProductsListMobile";
import useXBreakpoint from "../../../hooks/useXBreakpoint";
import SectionList from "../../../components/SectionList";

const LubricantProducts = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [pages, setPages] = useState([]);
  const [tags, setTags] = useState(null);

  const isMobile = useXBreakpoint(768);

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
    (async () => {
      try {
        const response = await getAllTags();

        if (response.message === "success") {
          setTags(response.data.tags);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const recommendSectionImage =
    currentPage && currentPage.sections.find(({ slug }) => slug.includes("recommend-image"));

  return (
    <Layout pageTitle="Lubricant Products" withBottomPadding={false} backButton={true}>
      {currentPage && (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <section className={styles.sections}>
            <SectionList
              sections={currentPage.sections.filter(
                ({ slug }) => !slug.includes("recommend-image")
              )}
            />
          </section>
          {!isMobile && <LubricantProductsListDesktop tags={tags} />}
          {isMobile && <LubricantProductsListMobile tags={tags} />}
          <div className={styles.recommender}>
            {recommendSectionImage && (
              <div className={styles.imageContainer}>
                <img
                  className={styles.recommendImg}
                  src={recommendSectionImage.image ? recommendSectionImage.image.path : ""}
                  alt={recommendSectionImage.image.file_name}
                />
              </div>
            )}

            <div className={styles.recommendDescription}>
              <p className={styles.descriptionTitle}>Didn’t find what you were looking for?</p>
              <p className={styles.descriptionSubTitle}>Try Our Lubricant Recommender</p>
            </div>
            <a
              style={{ display: "block" }}
              target="_blank"
              rel="noopener noreferrer"
              href="http://engen.ewp.earlweb.net/">
              <Button classes="white" addStyle="buttonRecomended" text="Try Now" />
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};

export default LubricantProducts;
