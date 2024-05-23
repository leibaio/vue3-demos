import axios, { AxiosInstance, AxiosResponse } from 'axios';

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 根据实际情况设置你的API基准路径
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
    // 请求错误处理
    Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    // 这里可以根据自己的业务需求来定制
    // 例如，可以根据后端返回的状态码做不同的处理
    if (res.code !== 200) {
      // 当返回的code不是200时，代表请求出现错误，你可以在这里做错误处理
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      // 当返回的code是200时，直接返回数据
      return response.data;
    }
  },
  (error) => {
    // 响应错误处理
    return Promise.reject(error);
  }
);

export default request;