import React, { useState, useEffect } from "react";
import InstagramEmbed from "react-instagram-embed";

import styles from "./MediaRoom.module.scss";
import Carousel from "../../components/Carousel";
import Layout from "../../components/Layout/Layout";

import MediaCarouselItem from "../../components/MediaCarouselItem";
import Button from "../../components/buttons/Button";
import Socials from "../../components/Socials";
import NavigationBanner from "../../components/NavigationBanner";
import SectionList from "../../components/SectionList";

import { getInstagramPostsByEngenId } from "../../api/socials.api";
import { getAllMediaReleases } from "../../api/news.api";
import { getAllB2BMedia } from "../../api/b2b.api";
import FacebookFeed from "../../components/FacebookFeed";

const MediaRoom = ({ history }) => {
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [mediaReleases, setMediaReleases] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllB2BMedia();

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

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllMediaReleases();

        if (response.message === "success") {
          setMediaReleases(response.data["media-release"].data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await getInstagramPostsByEngenId();
        if (response.status === 200) {
          setInstagramPosts(response.data.data.map(({ link }) => link));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleViewAllReleases = () => () => history.push("media/media-release");

  return (
    <Layout pageTitle="Media" withBottomPadding={false}>
      {currentPage ? <NavigationBanner pages={pages} activePage={currentPage} /> : null}
      <div className={styles["media-contacts"]}>
        <h2 className={styles["media-contacts-title"]}>Media Contacts</h2>
        <div className={styles["media-contacts-item"]}>
          <p className={styles["media-contacts-item-block"]}>
            <span className={styles["media-contacts-item-title"]}>Gavin Smith</span>
            <span className={styles["media-contacts-item-subtitle"]}>
              External Communications Manager
            </span>
          </p>
          <p className={styles["media-contacts-item-block"]}>
            <a href="tel:+27 (0) 21 403 4312" className={styles["media-contacts-item-contact"]}>
              Tel: +27 (0) 21 403 4312
            </a>
            <a
              href="mailto:gavin.smith@engenoil.com"
              className={styles["media-contacts-item-contact"]}>
              Email: gavin.smith@engenoil.com
            </a>
          </p>
        </div>
        <div className={styles["media-contacts-item"]}>
          <p className={styles["media-contacts-item-block"]}>
            <span className={styles["media-contacts-item-title"]}>Thandeka Cele</span>
            <span className={styles["media-contacts-item-subtitle"]}>
              Public Affairs Manager (Refinery)
            </span>
          </p>
          <p className={styles["media-contacts-item-block"]}>
            <a href="tel:+27 (0) 31 460 2439" className={styles["media-contacts-item-contact"]}>
              Tel: +27 (0) 31 460 2439
            </a>
            <a
              a
              href="mailto:thandeka.cele@engenoil.com"
              className={styles["media-contacts-item-contact"]}>
              Email: thandeka.cele@engenoil.com
            </a>
          </p>
        </div>
      </div>
      {currentPage && currentPage.sections && currentPage.sections.length ? (
        <div className={styles.sections}>
          <SectionList sections={currentPage.sections} />
        </div>
      ) : null}
      <h2 className={styles["carousel-title"]}>Latest Media Releases</h2>
      <div>
        {mediaReleases && mediaReleases.length ? (
          <Carousel
            slides={mediaReleases.sort((a, b) => {
              return new Date(b.uploaded_date) - new Date(a.uploaded_date);
            })}
            render={(slides, activeSlide) => {
              return slides.map((post, index) => (
                <MediaCarouselItem
                  page="media"
                  tag={post.tag}
                  post={post}
                  key={post.id}
                  activePost={activeSlide === index}
                />
              ));
            }}
          />
        ) : null}
      </div>
      <div className={styles["button-centered"]}>
        <Button
          style={{ margin: "0 auto", width: "fit-content" }}
          text="View All"
          onClick={handleViewAllReleases()}
        />
      </div>
      <div className={styles["social-media-feed"]}>
        <h2 className={styles["carousel-title"]}>Social Media Feed</h2>
        <div className={styles["insta-carousel"]}>
          {instagramPosts && instagramPosts.length ? (
            <Carousel
              slides={instagramPosts}
              settingsProps={{ swipeToSlide: true }}
              hideShowPage
              render={slides =>
                slides.map(post => (
                  <div className={[styles["insta-card-wrapper"]]} key={post}>
                    <InstagramEmbed
                      url={post}
                      maxWidth={410}
                      hideCaption={true}
                      containerTagName="div"
                      protocol=""
                      injectScript
                    />
                  </div>
                ))
              }
            />
          ) : null}
        </div>
        <div className={styles.facebookFeed}>
          <FacebookFeed />
        </div>
        <div className={styles["social-media-feed"]}>
          <h2 className={`${styles["carousel-title"]} ${styles["socials"]}`}>Follow Us On:</h2>
          <div className={styles["button-centered"]} style={{ paddingTop: 0 }}>
            <Socials />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MediaRoom;
