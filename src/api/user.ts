import request from "../utils/request";

// 获取用户信息
export const getUserInfo = (params: any) =>
  request({
    url: '/user/info',
    method: 'get',
    params
  });

// 创建用户
export const createUser = (data: any) =>
  request({
    url: '/user/create',
    method: 'post',
    data
  });

// 更多API处理...