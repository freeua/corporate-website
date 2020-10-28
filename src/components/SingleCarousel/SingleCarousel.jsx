import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import styles from "./SingleCarousel.module.scss";
import ArrowButton from "../buttons/ArrowButton";

const Promotions = ({ children, asNavFor, sliderRef, buttonsDisabled }) => {
  const settings = {
    asNavFor: asNavFor && sliderRef,
    dots: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    pauseOnHover: true,
    nextArrow: <ArrowButton disabled={buttonsDisabled} arrowDirection="right" />,
    prevArrow: <ArrowButton disabled={buttonsDisabled} arrowDirection="left" />,
  };

  return (
    <div className={styles.wrapper}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default Promotions;
