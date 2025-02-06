import request from '@/utils/request';
import type { ApiResponse, WechatQrCodeResult, WechatScanStatus, WechatLoginResult } from '@/types/api';

/**
 * 获取微信登录二维码
 */
export function getLoginQrCode() {
  return request.get<ApiResponse<WechatQrCodeResult>>('/api/wechat/qrcode');
}

/**
 * 检查微信扫码状态
 * @param qrCodeId 二维码ID
 */
export function checkScanStatus(qrCodeId: string) {
  return request.get<ApiResponse<WechatScanStatus>>(`/api/wechat/scan-status/${qrCodeId}`);
}

/**
 * 确认微信登录
 * @param qrCodeId 二维码ID
 */
export function confirmLogin(qrCodeId: string) {
  return request.post<ApiResponse<WechatLoginResult>>('/api/wechat/login', { qrCodeId });
}
