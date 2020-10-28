import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "./MediaReleasesAds.module.scss";
import Layout from "../../../components/Layout/Layout";
import Banner from "../../../components/Banner";
import Carousel from "../../../components/Carousel";
import Loader from "../../../components/Loader";
import { getTvAds } from "../../../api/news.api";
import ViewPreview from "../../../components/VideoPreview";
import useXBreakpoint from "../../../hooks/useXBreakpoint";
import { getB2bBySlug } from "../../../api/b2b.api";

const youtubeFrameOpts = {
  height: "700px",
  width: "1900px",
  playerVars: {
    controls: 2,
  },
};

const MediaReleasesAds = () => {
  const [tvAds, setTvAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [activeVideo, setActiveVideo] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useXBreakpoint(768);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getTvAds();
        setLoading(false);
        if (response.message === "success") {
          setTvAds(response.data.tvads.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await getB2bBySlug("media-videos");

        if (response.message === "success") {
          setCurrentPage(response.data.b2b);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (tvAds && tvAds.length) {
      setActiveVideo(tvAds[0]);
    }
  }, [tvAds]);

  const onVideoReady = event => {
    event.target.pauseVideo();
  };

  const setActiveVideoId = video => () => {
    if (playlist) {
      playlist.forEach(player => {
        player.pauseVideo();
      });
    }

    setActiveVideo(video);
  };

  const previews = tvAds.map(({ url, name }) => ({
    name,
    url: `https://img.youtube.com/vi/${url.split("/")[4]}/0.jpg`,
  }));

  return (
    <Layout pageTitle="Media Releases" backButton={true}>
      <Banner
        backgroundImage={currentPage && currentPage.image ? currentPage.image.path : ""}
        title="Videos"
      />
      {!isMobile ? (
        <div className={styles["fullscreen-carousel"]}>
          {loading ? <Loader /> : null}
          {activeVideo ? (
            <YouTube
              videoId={activeVideo.url.split("/")[4]}
              opts={youtubeFrameOpts}
              onReady={onVideoReady}
            />
          ) : null}
        </div>
      ) : null}
      <div>
        {previews && previews.length ? (
          <Carousel
            carouselType="videos"
            slides={previews}
            render={(slides, activeSlide) =>
              slides.map(({ url, name }, index) => (
                <div key={url} onClick={setActiveVideoId({ url, name })}>
                  <ViewPreview
                    url={url}
                    name={name}
                    activeVideo={activeVideo.name === name}
                    activePost={activeSlide === index}
                    setPlaylist={setPlaylist}
                    playlist={playlist}
                    isSmall
                  />
                </div>
              ))
            }
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default MediaReleasesAds;
