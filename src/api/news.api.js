import { get, post } from "../services";

export const getNewsByCountry = () => get("country/posts/all");

export const getAllMediaReleases = () => get("media-release/all");

export const getMediaReleasesByTag = (tag, page = 1) =>
  get(`/media-release/${tag}/tag?page=${page}`);

export const getFilteredMediaReleasesByTag = (tag, page = 1, filters) =>
  post(`/media-release/${tag}/tag?page=${page}`, filters);

export const getMediaReleaseBySlug = slug => get(`media-release/${slug}/slug`);

export const getTvAds = () => get("tvads/all");

export const getMediaYears = () => get("media-release/years/all");
