import React, { useEffect, useState } from "react";

import styles from "./Products.module.scss";

import Layout from "../../components/Layout";
import Product from "../../components/Product";
import Banner from "../../components/Banner";
import productBannerImg from "../../static/images/products-background.png";
import Button from "../../components/buttons/Button";
import Loader from "../../components/Loader";

import { getProductsByPage } from "../../api/products.api";
import { ProductsFilter } from "../../components/ProductsFilter/ProductsFilter";
import SearchInput from "../../components/inputs/SearchInput";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState([]);
  const [fetchingProducts, setProductFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPagination, setShowPagination] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (currentPage === 1) setProductFetching(true);

        setLoading(true);

        const response = await getProductsByPage(currentPage);

        setProducts(prevProducts => [...prevProducts, ...response.data.products.data]);
        setTotalPages(response.data.products.last_page);
        setLoading(false);
        setProductFetching(false);
      } catch (error) {
        setProducts([]);
        console.error(error);
      }
    })();
  }, [currentPage]);

  useEffect(() => {
    setShowPagination(currentPage < totalPages);
  }, [currentPage, totalPages]);

  const loadMoreProducts = () => setCurrentPage(page => page + 1);

  const productList = products && products.length ? products : [];

  return (
    <Layout pageTitle="Products" withBottomPadding={false}>
      <Banner title="Engen Products" backgroundImage={productBannerImg} />
      <section className={styles["products-section"]}>
        <div className={styles.filters}>
          <ProductsFilter />
        </div>
        <div className={styles.productsWrapper}>
          <div className={styles.search}>
            <SearchInput
              name="search-contact"
              value={searchValue}
              key={"search-contact"}
              onChange={event => setSearchValue(event.target.value)}
              placeholder={fetchingProducts ? "Loading..." : "Name or code"}
              disabled={fetchingProducts}
              onClear={() => setSearchValue("")}
            />
          </div>
          <div className={styles.products}>
            {productList.length ? (
              productList.map(({ title, slug, image }) => (
                <div key={slug} className={styles.product}>
                  <Product image={image && image.path} slug={slug} title={title} />
                </div>
              ))
            ) : fetchingProducts ? (
              <Loader />
            ) : (
              <h2>No products for your query</h2>
            )}
          </div>
          {showPagination && (
            <div className={styles["load-more"]}>
              {loading ? <Loader /> : <Button text="Load More" onClick={loadMoreProducts} />}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
