import {
  EmployeeListQueryParams,
  EmployeeLoginParams,
} from "../types/employee";
import request from "../utils/request";

// 登录
export const login = (params: EmployeeLoginParams) =>
  request({
    url: "/employee/login",
    method: "post",
    data: params,
  });

export const queryEmployeeList = (params: EmployeeListQueryParams) =>
  request({
    url: "/employee/page",
    method: "get",
    params,
  });

export const changeStatus = () =>
  request({
    url: "",
    method: "",
    params: "",
    data: "",
  });
