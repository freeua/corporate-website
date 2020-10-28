import React, { useState, useEffect } from "react";

import styles from "./IndustrialView.module.scss";

import Layout from "../../../components/Layout";
import NavigationBanner from "../../../components/NavigationBanner";

import { getAllB2BIndustrials } from "../../../api/b2b.api";
import Card from "../../../components/Card";
import Button from "../../../components/buttons/Button";
import useXBreakpoint from "../../../hooks/useXBreakpoint";
import CardCollapsible from "../../../components/CardCollapsible";
import SectionList from "../../../components/SectionList";

const IndustrialView = ({ match }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  const isMobile = useXBreakpoint(1024);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BIndustrials();

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
    <Layout
      pageTitle={`Industrial ${currentPage ? currentPage.title : ""}`}
      withBottomPadding={false}
      backButton={true}>
      {currentPage ? (
        <>
          <NavigationBanner pages={pages} activePage={currentPage} />
          <section className={styles.sections}>
            <SectionList sections={currentPage ? currentPage.sections : []} />
          </section>
          {currentPage && currentPage.products && currentPage.products.length ? (
            <>
              <section className={styles.products}>
                {currentPage &&
                  currentPage.products &&
                  currentPage.products.length &&
                  currentPage.products.map(product => {
                    if (isMobile) {
                      return (
                        <div key={product.title} className={styles.mobileProduct}>
                          <CardCollapsible title={product.title}>
                            <div
                              dangerouslySetInnerHTML={{ __html: product.description }}
                              className={styles.mobileProductDescription}
                            />
                          </CardCollapsible>
                        </div>
                      );
                    }
                    return (
                      <div key={product.title} className={styles.productWrapper}>
                        <Card title={product.title}>
                          <div
                            className={styles.productDescription}
                            dangerouslySetInnerHTML={{ __html: product.description }}
                          />
                        </Card>
                      </div>
                    );
                  })}
              </section>
              <div className={styles.viewAll}>
                <Button text="View All" href="/products" />
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </Layout>
  );
};

export default IndustrialView;
