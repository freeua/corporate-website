import { get } from "../services";

export const getFaqBySlug = slug => get(`faq/${slug}/slug`);
