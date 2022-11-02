import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: "",
  baseURL: "https://k7a307.p.ssafy.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
