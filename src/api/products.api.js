import { get, post } from "../services";

export const getProductsCategories = () => get("product/categories");

export const getProductsByCategoryId = (id, page = 1) =>
  get(`category/id/${id}/products?page=${page}`);

export const getProductsByPage = (page = 1) => get(`products/all?page=${page}`);

export const getProductBySlug = slug => get(`product/${slug}/slug`);

export const getAllTags = () => get(`tags/all`);

export const getAllTagsByFilter = filters => post(`tags/all`, filters);

export const getAllProducts = () => get(`products/all`);

export const getAllProductsByPage = (page = 1) => get(`products/all?page=${page}`);

export const getAllProductsByFilters = (filters, page = 1) =>
  post(`products/all?page=${page}`, filters);
