import { post } from "../services";

export const getSearchResults = (page = 1, filters) => post(`/search/all?page=${page}`, filters);
