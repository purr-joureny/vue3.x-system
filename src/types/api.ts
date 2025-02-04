// 通用响应接口
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 登录请求参数接口
export interface LoginParams {
  username: string;
  password: string;
}

// 登录响应数据接口
export interface LoginResult {
  token: string;
  userInfo: {
    id: number;
    username: string;
    avatar?: string;
    roles: string[];
  };
}

// 注册请求参数接口
export interface RegisterParams {
  username: string;
  password: string;
  confirmPassword: string;
}

// 用户信息接口
export interface UserInfo {
  id: number;
  username: string;
  nickname?: string;
  avatar?: string;
  roles: string[];
  email?: string;
  createTime: string;
  updateTime: string;
}
