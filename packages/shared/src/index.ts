import { createRequest } from '@dev-jury/axios';
import type { ResponseData } from '@dev-jury/axios';

// 获取baseURL
const getBaseURL = () => {
    try {
        return import.meta.env.VITE_API_BASE_URL || '';
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
