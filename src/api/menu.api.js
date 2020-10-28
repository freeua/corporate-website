import { get } from "../services";

export const getQuickLinks = () => get("menu/quick-links/slug");

export const getFooterMenu = () => get("menu/footer-menu/slug");

export const getNavigationMenu = () => get("menu/main-menu/slug");

export const getHomepageMenu = () => get("menu/home-page/slug");
