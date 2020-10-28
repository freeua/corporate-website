import React, { useEffect } from "react";
import YouTube from "react-youtube";
import styles from "./ViewPreview.module.scss";
import PlayButton from "../PlayButton";
import useXBreakpoint from "../../hooks/useXBreakpoint";

const youtubeFrameOpts = {
  height: "390",
  width: "640",
  playerVars: {
    controls: 2,
  },
};

const ViewPreview = ({ name, url, activePost, activeVideo, setPlaylist }) => {
  const isMobile = useXBreakpoint(768);

  const onVideoReady = event => {
    setPlaylist(prevList => [...prevList, event.target]);
  };

  useEffect(() => {
    if (!activeVideo) {
    }
  }, [activeVideo]);

  if (isMobile) {
    return (
      <div className={styles.container}>
        <div className={`${styles.wrapper} ${activePost ? styles["active-wrapper"] : ""}`}>
          <div
            className={`${styles["img-wrapper"]} ${
              activePost ? styles["active-img-wrapper"] : ""
            }`}>
            <YouTube videoId={url.split("/")[4]} opts={youtubeFrameOpts} onReady={onVideoReady} />
            <div className={styles["play-btn"]}>{!activePost ? <PlayButton isSmall /> : null}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${activePost ? styles["active-wrapper"] : ""}`}>
        <div
          className={`${styles["img-wrapper"]} ${activePost ? styles["active-img-wrapper"] : ""}`}>
          <img className={styles.img} src={url} alt={name} />
          <div className={styles["play-btn"]}>{!activeVideo ? <PlayButton isSmall /> : null}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewPreview;
