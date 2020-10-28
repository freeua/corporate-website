import React, { useState, useEffect } from "react";

import styles from "./Promotions.module.scss";

import Layout from "../../components/Layout/Layout";
import Banner from "../../components/Banner";
import MediaItem from "../../components/MediaItem";

import { getAllPromotionsByCountry } from "../../api/promotions.api";
import { getB2bBySlug } from "../../api/b2b.api";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getB2bBySlug("promos");

        if (response.message === "success") {
          setCurrentPage(response.data.b2b);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllPromotionsByCountry();

        if (response.message === "success") {
          setPromotions(response.data.promotions);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Layout pageTitle={currentPage ? currentPage.title : "Promotions"}>
      <Banner
        backgroundImage={currentPage && currentPage.image ? currentPage.image.path : ""}
        title={currentPage ? currentPage.title : "Promotions"}
      />
      <div className={styles.promotions}>
        {promotions.map((post, index) => (
          <div key={post.slug + index} className={styles["promotion-wrapper"]}>
            <MediaItem
              post={post}
              key={post.slug}
              imageFit={"contain"}
              page="promotions"
              slug={post.slug}
              activePost
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Promotions;
