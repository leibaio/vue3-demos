import request from "../utils/request";

// 获取用户信息
export const getUserInfo = (params: any) =>
  request({
    url: '/user',
    method: 'post',
    params
  });

// 创建用户
export const createUser = (data: any) =>
  request({
    url: '/user/create',
    method: 'post',
    data
  });

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  });