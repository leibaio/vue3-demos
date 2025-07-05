export interface EmployeeLoginParams {
  username: string;
  password: string;
}

export interface EmployeeLoginResult {
  id: number;
  userName: string;
  name: string;
  token: string;
}

export interface EmployeeListQueryParams {
  name?: string;
  page: number;
  pageSize: number;
}
