import React from "react";

import styles from "./ProductsList.module.scss";
import Product from "../Product/Product";

const ProductsList = ({ products }) => {
  return (
    <div className={styles.wrapper}>
      {products && products.length ? (
        products.map(({ title, slug, image }) => (
          <div key={slug} className={styles.product}>
            <Product image={image && image.path} slug={slug} title={title} />
          </div>
        ))
      ) : (
        <h2>No products for your query</h2>
      )}
    </div>
  );
};

export default ProductsList;
