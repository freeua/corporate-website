import { get } from "../services";

export const getAllPromotionsByCountry = () => get("country/promotions/all");

export const getPromotionBySlug = slug => get(`promotion/${slug}/slug`);
