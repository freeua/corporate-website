import React, { useEffect } from "react";
import Cookies from "js-cookie";

import styles from "./Layout.module.scss";

import Header from "../Header";
import Footer from "../Footer";
import { QuickLinksWidget } from "../widgets";
import { getUserCountry } from "../../api/stations.api";

const Layout = ({
  pageTitle = "Engen",
  withBottomPadding = true,
  withScrollToTop = true,
  backButton = false,
  children,
}) => {
  useEffect(() => {
    document.title = pageTitle;

    if (withScrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [pageTitle, withScrollToTop]);

  useEffect(() => {
    if (!Cookies.get("countryCode")) {
      (async () => {
        try {
          const { country_code } = await getUserCountry();

          Cookies.set("countryCode", country_code, { expires: 1 });
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header backButton={backButton} />
      <main style={{ paddingBottom: withBottomPadding && "10rem" }} className={styles.main}>
        {children}
      </main>
      <Footer />
      <QuickLinksWidget />
    </div>
  );
};

export default Layout;
