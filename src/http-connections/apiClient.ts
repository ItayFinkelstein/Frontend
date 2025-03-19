import axios, { CanceledError } from "axios";
import { SERVER_BASE_URL } from "../config";
import Cookies from "js-cookie";

export { CanceledError };

const apiClient = axios.create({
  baseURL: SERVER_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
