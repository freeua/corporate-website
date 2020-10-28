import React, { useEffect, useState } from "react";

import DesktopNavigation from "./DesktopNavigation";
import useXBreakpoint from "../../hooks/useXBreakpoint";
import MobileNavigation from "./MobileNavigation";
import { getNavigationMenu } from "../../api/menu.api";

const Navigation = () => {
  const isMobile = useXBreakpoint(1024);
  const [navMenu, setNavMenu] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getNavigationMenu();

        if (response.message === "success") {
          setNavMenu(response.data.menu.menuitems.sort((a, b) => a.sort_order - b.sort_order));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return isMobile ? <MobileNavigation menu={navMenu} /> : <DesktopNavigation menu={navMenu} />;
};

export default Navigation;
