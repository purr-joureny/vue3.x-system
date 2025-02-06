import { get, post } from '@/utils/request';
import type { ApiResponse, LoginParams, LoginResult, RegisterParams, UserInfo, WechatLoginResult } from '@/types/api';

export const userApi = {
  // 登录
  login(data: LoginParams) {
    return post<ApiResponse<LoginResult>>('/auth/login', data);
  },

  // 注册
  register(data: RegisterParams) {
    return post<ApiResponse<null>>('/auth/register', data);
  },

  // 获取用户信息
  getUserInfo() {
    return get<ApiResponse<UserInfo>>('/user/info');
  },

  // 退出登录
  logout() {
    return post<ApiResponse<null>>('/auth/logout');
  },

  // 微信登录
  wechatLogin(qrCodeId: string) {
    return post<ApiResponse<WechatLoginResult>>('/auth/wechat-login', { qrCodeId });
  }
};
