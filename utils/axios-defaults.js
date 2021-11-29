import axios from "axios";
import Router from "next/router";

import AuthHelper from "../helpers/AuthHelper";

const axiosDefault = () => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

  axios.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
      const token = AuthHelper.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorResponse = error.response;
      const unauthorizedRequest = errorResponse?.status === 401;

      if (unauthorizedRequest) {
        Router.push("/");
      } else {
        return new Promise((_resolve, reject) => {
          reject(error);
        });
      }
    }
  );
};

export default axiosDefault;
