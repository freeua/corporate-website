import React, { useState, useEffect } from "react";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  LivejournalShareButton,
  ViberShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  LivejournalIcon,
  ViberIcon,
} from "react-share";

import styles from "./ShareSocials.module.scss";
import { ShareIcon } from "../icons";

const ShareSocials = ({ title }) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleClickShare = () => async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url: shareUrl,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Tooltip
        placement="bottom"
        trigger={["click"]}
        overlay={
          <div className={styles.socials}>
            <div className={styles["share-item"]}>
              <FacebookShareButton url={shareUrl} quote={title} className={styles["share-button"]}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>

            <div className={styles["share-item"]}>
              <TwitterShareButton url={shareUrl} title={title} className={styles["share-button"]}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>

            <div className={styles["share-item"]}>
              <LinkedinShareButton
                url={shareUrl}
                windowWidth={750}
                windowHeight={600}
                className={styles["share-button"]}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>

            <div className={styles["share-item"]}>
              <TelegramShareButton url={shareUrl} title={title} className={styles["share-button"]}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>

            <div className={styles["share-item"]}>
              <ViberShareButton
                url={shareUrl}
                windowWidth={750}
                windowHeight={600}
                className={styles["share-button"]}>
                <ViberIcon size={32} round />
              </ViberShareButton>
            </div>

            <div className={styles["share-item"]}>
              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className={styles["share-button"]}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <div className={styles["share-item"]}>
              <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className={styles["share-button"]}>
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>

            <div className={styles["share-item"]}>
              <LivejournalShareButton
                url={shareUrl}
                title={title}
                description={shareUrl}
                className={styles["share-button"]}>
                <LivejournalIcon size={32} round />
              </LivejournalShareButton>
            </div>
          </div>
        }>
        <div className={styles.icon} onClick={handleClickShare()}>
          <ShareIcon />
        </div>
      </Tooltip>
    </div>
  );
};

export default ShareSocials;
