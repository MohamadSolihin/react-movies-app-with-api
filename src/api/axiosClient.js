import axios from "axios";
import queryString from "query-string";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL, 
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: params => {
    const serializedParams = queryString.stringify({
      ...params,
      api_key: apiConfig.apikey,
    });
    // console.log("Serialized Params:", serializedParams); // Debug
    return serializedParams;
  },
});

axiosClient.interceptors.request.use(
  async config => {
    // console.log("Request URL:", config.url); // Debug URL
    return config;
  },
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    console.error("API Error:", error.response || error.message); // Log error
    throw error;
  }
);

export default axiosClient;
