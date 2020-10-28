import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import headImage from "../../static/images/smiling-man1.jpg";

import styles from "./Homepage.module.scss";

import Layout from "../../components/Layout/Layout";
import MainMenu from "../../components/MainMenu";
import { FuelPricesWidget } from "../../components/widgets";
import ArrowIcon from "../../components/icons/ArrowIcon";
import useXBreakpoint from "../../hooks/useXBreakpoint";

import promotionPage from "../../static/images/promotion-image.jpg";

import MediaCarouselItem from "../../components/MediaCarouselItem";
import Carousel from "../../components/Carousel";
import { getMediaReleasesByTag } from "../../api/news.api";
import { getB2bBySlug } from "../../api/b2b.api";

const OurFuelsAndProducts = () => (
  <div className={styles["fuels-wrapper"]}>
    <div className={styles["fuels-main"]}>
      <div className={`${styles["fuels-title"]} title`}>Our Fuels & Products</div>
      <ul className={styles["fuels-links"]}>
        <li>
          <Link to="/our-fuels" className="text">
            Learn About Our Fuels
            <ArrowIcon color="white" pixelWeight={2} />
          </Link>
        </li>
        <li>
          <Link to="/products" className="text">
            View Products
            <ArrowIcon color="white" pixelWeight={2} />
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

const Homepage = () => {
  const [mediaReleases, setMediaReleases] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  const isMobile = useXBreakpoint(1024);

  useEffect(() => {
    (async () => {
      try {
        const response = await getMediaReleasesByTag("media-release");

        if (response.message === "success") {
          setMediaReleases(response.data["media-release"].data);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const response = await getB2bBySlug("homepage");

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

  return (
    <Layout pageTitle="Home | Engen">
      <section className={styles.banner}>
        <div
          style={{
            backgroundImage: `url(${
              currentPage && currentPage.image ? currentPage.image.path : ""
            })`,
          }}
          className={styles["banner-background"]}
        />
        <div className={styles["background-title-container"]}>
          <div className="container">
            <p className={styles["background-title"]}>{currentPage && currentPage.header_title}</p>
          </div>
        </div>
        <div className={styles["banner-menu"]}>
          <MainMenu />
        </div>
      </section>
      <section className={styles["widget-container"]}>
        <div className={styles.promotions}>
          {/* <SingleCarousel>
            {promotions && promotions.length ? (
              promotions.map(promotion => (
                <PromotionItem key={promotion.slug + promotion.id} promotion={promotion} />
              ))
            ) : (
              <p className="title">Sorry, but no promotions here</p>
            )}
          </SingleCarousel> */}

          <img src={promotionPage} alt="promotion-page" className={styles.promotionImage} />

          <div className={styles.content}>
            <h2 className={styles.title}>Promotions</h2>
            <Link to={`promotions`}>
              <div className={styles.item}>
                <p className={styles["link-wrapper"]}>
                  <span className={`${styles.link} text`}>Read More</span>
                  <span className={styles.arrowPromotion} />
                </p>
              </div>
            </Link>
          </div>
        </div>
        {isMobile && <OurFuelsAndProducts />}
        <div className={styles.fuels}>
          <FuelPricesWidget />
          {!isMobile && <OurFuelsAndProducts />}
        </div>
        <div className={styles.cares}>
          <div className={styles["cares-wrapper"]}>
            <div className={styles["cares-img"]}>
              <img src={headImage} alt="" />
            </div>
            <div className={styles["cares-main"]}>
              <div className={`${styles["cares-title"]} title`}>Engen Cares</div>
              <ul className={styles["cares-links"]}>
                <li>
                  <Link to="/engen-cares/csi">
                    <p className="text">CSI</p>
                    <ArrowIcon pixelWeight={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/engen-cares/sustainability">
                    <p className="text">Sustainability</p>
                    <ArrowIcon pixelWeight={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/engen-cares/sponsorship">
                    <p className="text">Sponsorships</p>
                    <ArrowIcon pixelWeight={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/engen-cares/hseq">
                    <p className="text">HSEQ</p>
                    <ArrowIcon pixelWeight={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/engen-cares/transformation">
                    <p className="text">Transformation</p>
                    <ArrowIcon pixelWeight={2} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.news}>
        <div className={styles["news-title"]}>
          <h2 className="title">Latest News</h2>
        </div>
        <div className={styles["news-container"]}>
          {mediaReleases && mediaReleases.length ? (
            <Carousel
              slides={mediaReleases.sort((a, b) => {
                return new Date(b.uploaded_date) - new Date(a.uploaded_date);
              })}
              render={(slides, activeSlide) => {
                return slides.map((post, index) => (
                  <MediaCarouselItem
                    page="media"
                    tag="media-release"
                    post={post}
                    key={post.id}
                    activePost={activeSlide === index}
                  />
                ));
              }}
            />
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default Homepage;
