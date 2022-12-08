import axios from "axios";

export const axiosIns = axios.create({
  baseURL: "http://43.201.101.151",
});

axiosIns.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers["Access_Token"] = accessToken;
  }
  return config;
});
