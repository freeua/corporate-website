import React, { useRef } from "react";

import styles from "./RelationCarousel.module.scss";

import SingleCarousel from "../SingleCarousel";
import posts from "../../lib/news";
import MediaCarouselItem from "../MediaCarouselItem";
import Carousel from "../Carousel";

const RelationCarousel = () => {
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  return (
    <div className={styles.wrapper}>
      <div style={{ width: "100%", marginBottom: 200 }}>
        <SingleCarousel ref={slider1} asNavFor={slider2.current}>
          {posts.map((post, index) => (
            <MediaCarouselItem post={post} key={post.id} />
          ))}
        </SingleCarousel>
      </div>
      <div style={{ width: "100%", marginBottom: 200 }}>
        <Carousel
          ref={slider2}
          asNavFor={slider1.current}
          slides={posts}
          render={(slides, activeSlide) =>
            slides.map((post, index) => (
              <MediaCarouselItem post={post} key={post.id} activePost={activeSlide === index} />
            ))
          }
        />
      </div>
    </div>
  );
};

export default RelationCarousel;
