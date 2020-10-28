import React from "react";
import styles from "./Product.module.scss";
import ArrowIcon from "../icons/ArrowIcon";
import { Link } from "react-router-dom";

import placeholderImage from "../../static/images/product-placeholder.png";

const Product = ({ image, title, slug }) => {
  return (
    <div className={styles.wrapper}>
      <Link to={`/products/${slug}`} className={styles["img-wrapper"]}>
        <img className={styles.img} src={image || placeholderImage} alt={title} />
      </Link>
      <Link to={`/products/${slug}`} className={styles.info}>
        <span className={styles.name}>{title}</span>
        <ArrowIcon pixelWeight={2} margin="0 0 0 20px" />
      </Link>
    </div>
  );
};

export default Product;
