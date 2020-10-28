import { get } from "../services";

export const getAllB2b = () => get("country/b2b/all");

export const getB2bBySlug = slug => get(`b2b/${slug}/slug`);

export const getAllB2BIndustrials = () => get("b2b/industrial/all");

export const getAllB2BAbout = () => get("b2b/about-engen/all");

export const getAllB2BLubricants = () => get("b2b/engen-lubricants/all");

export const getAllB2BMedia = () => get("b2b/media-room/all");

export const getAllB2BFuels = () => get("b2b/our-fuels/all");

export const getAllB2BMotorists = () => get("b2b/motorists/all");

export const getAllB2BBusinessPartners = () => get("b2b/business-partners/all");

export const getAllB2BEngenCares = () => get("b2b/engen-cares/all");

export const getAllB2BFaq = () => get("b2b/faq/all");
