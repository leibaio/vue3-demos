import request from "../utils/request";
import { EmployeeLoginParams } from "../types/employee";

// 登录
export const login = (params: EmployeeLoginParams) =>
  request({
    url: "/employee/login",
    method: "post",
    data: params,
  });
