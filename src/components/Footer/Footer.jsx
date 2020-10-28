import React, { useState, useEffect } from "react";

import DesktopFooter from "./DesktopFooter";
import useXBreakpoint from "../../hooks/useXBreakpoint";
import MobileFooter from "./MobileFooter";
import { getFooterMenu } from "../../api/menu.api";

const Footer = () => {
  const isMobile = useXBreakpoint(1024);
  const [footerMenu, setFooterMenu] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getFooterMenu();

        if (response.message === "success") {
          setFooterMenu(response.data.menu.menuitems);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return isMobile ? <MobileFooter menu={footerMenu} /> : <DesktopFooter menu={footerMenu} />;
};

export default Footer;
