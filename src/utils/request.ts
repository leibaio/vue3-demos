import axios, { AxiosInstance, AxiosResponse } from "axios";

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || "/api",
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config: any) => {
    // 这里可以添加一些请求前的逻辑，比如携带token等
    // if (store.getters.token) {
    //   config.headers['Authorization'] = getToken();
    // }
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
    if (res.code !== 200) {
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
