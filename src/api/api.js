import axios from "axios";

export const axiosIns = axios.create({
  baseURL: "http://18.206.140.108",
});

axiosIns.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers["Access_Token"] = accessToken;
  }
  return config;
});
