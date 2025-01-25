import { createRequest } from '@vue3-system/axios';
import type { ResponseData } from '@vue3-system/axios';

// 获取baseURL
const getBaseURL = () => {
    try {
        return typeof import.meta !== 'undefined' ? import.meta.env.VITE_API_BASE_URL : process.env.VITE_API_BASE_URL;
    } catch {
        return '';
    }
};

// 创建请求实例
export const request = createRequest({
    baseURL: getBaseURL() || '',
    timeout: 15000,
});

// 导出类型
export type { ResponseData };

// 导出工具函数
export * from './utils';
