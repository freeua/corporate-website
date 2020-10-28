import React, { useState, useEffect } from "react";
import moment from "moment";

import styles from "./MediaReleasesView.module.scss";

import Layout from "../../../components/Layout";
import Banner from "../../../components/Banner";

import mediaBanner from "../../../static/images/Media-Releases.png";
import Carousel from "../../../components/Carousel";
import MediaCarouselItem from "../../../components/MediaCarouselItem";
import ShareSocials from "../../../components/ShareSocials";
import { getMediaReleaseBySlug, getFilteredMediaReleasesByTag } from "../../../api/news.api";
import { ReactComponent as PdfLogo } from "../../../static/images/pdf-file-logo.svg";

const MediaReleasesView = ({ match }) => {
  const [mediaReleases, setMediaReleases] = useState([]);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      try {
        const response = await getMediaReleaseBySlug(match.params.media);

        if (response.message === "success") {
          setMedia(response.data["media-release"]);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [match.params.media]);

  useEffect(() => {
    if (media) {
      (async () => {
        try {
          const response = await getFilteredMediaReleasesByTag(media.tag, 1, {
            year: new Date(media.uploaded_date).getFullYear(),
          });

          const mediaReleasesResponse = response.data.response.data["media-release"].data;
          const foundedCurrentMediaIndex = mediaReleasesResponse.findIndex(
            ({ id }) => id === media.id
          );
          mediaReleasesResponse.splice(foundedCurrentMediaIndex, 1);

          setMediaReleases(
            mediaReleasesResponse.sort(
              (a, b) => new Date(b.uploaded_date) - new Date(a.uploaded_date)
            )
          );
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [media]);

  return (
    <Layout
      pageTitle={media && media.title ? media.title : "Media View"}
      withBottomPadding={false}
      backButton={true}
      withScrollToTop={true}>
      {media && (
        <>
          <Banner title={media.title} backgroundImage={mediaBanner} />
          <div className={styles.info}>
            <div style={{ width: !media.image ? "100%" : null }} className={styles.text}>
              <div className={styles.title}>
                <h2 className={styles["title-text"]}>{media.title}</h2>
                <div className={styles.share}>
                  <ShareSocials title={media.title} />
                </div>
              </div>
              <div className={styles.date}>
                {moment(media.uploaded_date).format("MMMM D, YYYY")}
              </div>
              <div
                className={styles["text-main"]}
                dangerouslySetInnerHTML={{ __html: media.description }}
              />
              {media.file && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["one-file"]}
                  href={media.file.path}
                  download={media.file.file_name + ".pdf"}>
                  <PdfLogo />
                  <span>{media.file.title}</span>
                </a>
              )}
            </div>

            <div className={styles.media}>
              {media.image && media.image.path ? (
                <div className={styles.img}>
                  <img src={media.image.path} alt={media.image.path} />
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles["carousel-section"]}>
            <div>
              {mediaReleases && mediaReleases.length ? (
                <>
                  <div className={`${styles["carousel-title"]} title`}>
                    More {media.tag.split("-").join(" ")} from {media.uploaded_date.split("-")[0]}
                  </div>
                  <Carousel
                    slides={mediaReleases}
                    render={(slides, activeSlide) =>
                      slides.map((post, index) => (
                        <MediaCarouselItem
                          post={post}
                          key={post.id}
                          page="media"
                          tag={media.tag !== "media-release" ? media.tag : "media-release"}
                          activePost={activeSlide === index}
                        />
                      ))
                    }
                  />
                </>
              ) : (
                <div className={`${styles["carousel-title"]} title`}>
                  No more {media.tag.split("-").join(" ")} in {media.uploaded_date.split("-")[0]}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default MediaReleasesView;
