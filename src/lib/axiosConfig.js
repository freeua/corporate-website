import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// instance.interceptors.request.use(config => {
//   // Sets authorization header before request is fired from cookies if
//   // the page is refreshed and headers are lost

//   const token = getUrlParameter("token") || Cookies.get("token");
//   if (token) {
//     config.headers.common.Authorization = "Bearer " + token;
//   } else {
//     // Send basic token if no token is present
//     config.headers.common.Authorization = "Bearer " + process.env.REACT_APP_API_KEY;
//   }

//   return config;
// });

// instance.interceptors.response.use(
//   response => {
//     // If response gives us a token then set all following
//     // requests to include token in headers and set token as a cookie
//     if (response.data.token) {
//       const token = response.data.token;
//       axios.defaults.headers.common.Authorization = "Bearer " + token;
//       Cookies.set("token", token, { expires: 2, secure: process.env.NODE_ENV === "production" });
//     }

//     return response;
//   },
//   error => {
//     const response = error.response;

//     if (response) {
//       const status = response.status;

//       // Request returned 401/403 so the token must have expired
//       if (window.location.pathname !== "/login") {
//         if (status === 401 || status === 403) {
//           // Redirect to login and remove invalid token
//           Cookies.remove("token");
//           window.location.href = "/login?sessionTimeout=1";
//         }
//       }

//       return Promise.reject(response);
//     }

//     return Promise.reject({
//       statusCode: 500,
//       message: "Unexpected server error. Please try again.",
//     });
//   }
// );

export default API;
