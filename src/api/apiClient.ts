import axios from "axios";
import auth from "./auth";

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("api_token");
    const role = auth.getCurrentUser().role;

    if (token) {
      config.headers["Authorization"] = `${role == 0 ? "User" : "Employee"} Bearer ` + token;
    }

    if (config.url.match("localhost")) config.headers["Language"] = localStorage.getItem("language");

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   return identities
    //     .refreshToken({
    //       refreshToken: localStorage.getItem("refreshToken"),
    //     })
    //     .then((res) => {
    //       if (res.status === 200) {
    //         console.log("Refreshed");
    //         localStorage.setItem("accessToken", res.data.accessToken);

    //         axios.defaults.headers.common["x-token"] =
    //           "Bearer " + localStorage.getItem("accessToken");

    //         return axios(originalRequest);
    //       }
    //     })
    //     .catch(() => {
    //       localStorage.clear();
    //       window.location.reload();
    //     });
    // } else if (error.response.status === 403) {
    //   localStorage.clear();
    //   window.location.reload();
    // }

    // return Error object with Promise
    return Promise.reject(error);
  }
);
export default axios;
