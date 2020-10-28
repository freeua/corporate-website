import React, { useState, useEffect } from "react";
import { FacebookProvider, EmbeddedPost } from "react-facebook";
import { getFacebookFeed } from "../../api/socials.api";
import Carousel from "../Carousel";

import styles from "./FacebookFeed.module.scss";

const FacebookFeed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await getFacebookFeed();

        setFeed(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (feed && feed.length) {
    return (
      <FacebookProvider appId={process.env.REACT_APP_FACEBOOK_APP_ID}>
        <Carousel
          slides={feed}
          settingsProps={{ swipeToSlide: true }}
          hideShowPage
          render={slides =>
            slides.map(({ permalink_url }) => (
              <div className={styles.post} key={permalink_url}>
                <EmbeddedPost href={permalink_url} width={"280px"} />
              </div>
            ))
          }
        />
      </FacebookProvider>
    );
  }

  return null;
};

export default FacebookFeed;
