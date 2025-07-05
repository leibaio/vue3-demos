import axios, { AxiosInstance, AxiosResponse } from "axios";
import store from "../store";

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || "/api",
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config: any) => {
    // 这里可以添加一些请求前的逻辑，比如携带token等
    const token = store.getters["user/userToken"];
    if (token) {
      config.headers["token"] = `${token}`;
      // config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (![200, 1].includes(res.code)) {
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
