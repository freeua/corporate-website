import React, { useState, useEffect } from "react";

import styles from "./PromotionView.module.scss";
import promotionBackground from "../../../static/images/promotion_banner.webp";

import Layout from "../../../components/Layout";
import Banner from "../../../components/Banner";
import ShareSocials from "../../../components/ShareSocials";
import moment from "moment";
import { getPromotionBySlug } from "../../../api/promotions.api";

const MediaReleasesView = ({ match }) => {
  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPromotionBySlug(match.params.promotion);

        if (response.message === "success") {
          setPromotion(response.data.promotion);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [match.params.promotion]);

  return (
    <Layout
      pageTitle={promotion && promotion.title ? promotion.title : "Media View"}
      withBottomPadding={false}
      backButton={true}
      withScrollToTop={true}>
      {promotion && (
        <>
          <Banner title={promotion.title} backgroundImage={promotionBackground} />
          <div className={styles.info}>
            <div className={styles.text} style={{ width: promotion.image ? "50%" : "100%" }}>
              <div className={styles.highInfo}>
                <div className={styles.title}>
                  <h2 className={styles["title-text"]}>{promotion.title}</h2>
                  <div className={styles.share}>
                    <ShareSocials title={promotion.title} />
                  </div>
                </div>
                <div className={styles.date}>
                  {moment(promotion.updated_at).format("MMMM D, YYYY")}
                </div>
              </div>
              <div className={styles.sections}>
                {promotion.description ? (
                  <div
                    className={styles["text-main"]}
                    dangerouslySetInnerHTML={{ __html: promotion.description }}
                  />
                ) : null}
              </div>
            </div>

            {promotion.image && (
              <div className={styles.media}>
                <img
                  src={promotion.image.path}
                  alt={promotion.image.description}
                  className={styles.img}
                />
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default MediaReleasesView;
