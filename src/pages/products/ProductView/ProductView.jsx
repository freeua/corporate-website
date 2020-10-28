import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../../components/Layout";
import styles from "./ProductView.module.scss";
import ArrowIcon from "../../../components/icons/ArrowIcon";
import productBannerImg from "../../../static/images/products-background.png";
import Banner from "../../../components/Banner";
import { ReactComponent as PdfLogo } from "../../../static/images/pdf-file-logo.svg";
import { getProductBySlug } from "../../../api/products.api";

const Products = () => {
  const [product, setProduct] = useState(null);

  const { slug: productSlug } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await getProductBySlug(productSlug);

        if (response.message === "success") {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [productSlug]);

  return (
    <Layout
      pageTitle={product && product.title ? product.title : "Product"}
      withBottomPadding={false}
      backButton={true}>
      <Banner breadcrumb title="Engen Products" backgroundImage={productBannerImg} />
      <div className={styles["info-wrapper"]}>
        {product && (
          <>
            <div className={styles["info-wrapper-left"]}>
              <div className={styles["advice-wrapper"]}>
                <div className={styles["advice-image-wrapper"]}>
                  <img
                    className={styles["advice-image"]}
                    src={product.image && product.image.path && product.image.path}
                    alt={product.title}
                  />
                </div>
              </div>
            </div>

            <div className={styles["info-wrapper-right"]}>
              <div className={styles["description-wrapper"]}>
                <h2>{product.title}</h2>
                <div
                  className={styles["description-text"]}
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                {product.upload_pdf && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={product.upload_pdf.path}
                    download={product.upload_pdf.file_name + ".pdf"}
                    className={styles["one-file"]}>
                    <PdfLogo />
                    <span>{product.upload_pdf.file_name}</span>
                  </a>
                )}
                <div className={styles["description-links"]}>
                  {product.telephone && (
                    <div style={{ marginBottom: 30 }}>
                      <a
                        href={`tel:${product.telephone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles["description-link"]}>
                        <span className={styles.name}>{product.telephone}</span>
                        <ArrowIcon pixelWeight={2} margin="7px 0px 0px 20px" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Products;
