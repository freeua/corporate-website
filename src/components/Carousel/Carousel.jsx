import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import styles from "./Carousel.module.scss";

import ArrowIcon from "../icons/ArrowIcon";

const SlickArrowButton = ({ currentSlide, slideCount, children, minHeight, ...props }) => (
  <span {...props}>{children}</span>
);

const Carousel = ({
  carouselType = "posts",
  slides,
  render,
  settingsProps,
  hideShowPage,
  asNavFor,
  sliderRef,
  arrows = true,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(slides.length < 4 ? Math.ceil(slides.length / 2) - 1 : 0);
  }, [slides.length]);

  let carouselTypeClassName;

  switch (carouselType) {
    case "posts":
      carouselTypeClassName = "news-center";
      break;
    case "videos":
      carouselTypeClassName = "video-list";
      break;
    default:
      console.error("Your carousel type didn't exist");
  }

  const settings = {
    asNavFor: asNavFor && sliderRef,
    className: `${slides.length < 4 ? "justify-center " : ""}${carouselTypeClassName}`,
    dots: false,
    speed: 300,
    infinite: true,
    slidesToShow: slides.length < 4 ? slides.length : 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    variableWidth: true,
    variableHeight: true,
    swipeToSlide: true,
    arrows,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    afterChange: currentSlide => {
      setActiveSlide(currentSlide);
    },
    prevArrow: (
      <SlickArrowButton>
        <div className="news-prev-btn">
          <ArrowIcon margin="0" pixelWeight={2} direction={"left"} />
        </div>
      </SlickArrowButton>
    ),
    nextArrow: (
      <SlickArrowButton>
        <div className="news-next-btn">
          <ArrowIcon margin="0" pixelWeight={2} />
        </div>
      </SlickArrowButton>
    ),
    ...settingsProps,
  };

  return (
    <>
      <Slider {...settings}>{render(slides, activeSlide)}</Slider>
      {!hideShowPage && (
        <div className={styles.pages}>
          {activeSlide + 1} / {slides.length}
        </div>
      )}
    </>
  );
};

export default Carousel;
