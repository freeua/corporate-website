import axios from "axios";

export const getInstagramPostsByEngenId = () =>
  axios.get(
    `https://api.instagram.com/v1/users/${process.env.REACT_APP_INSTAGRAM_USER_ID}/media/recent/?access_token=${process.env.REACT_APP_INSTAGRAM_TOKEN}&count=10`
  );

export const getFacebookFeed = () =>
  axios.get(
    `https://graph.facebook.com/${process.env.REACT_APP_FACEBOOK_PAGE_ID}/posts?fields=permalink_url&limit=10&access_token=${process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN}`
  );
