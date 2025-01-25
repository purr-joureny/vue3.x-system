import { createRequest } from '@vue3-system/axios';
import type { ResponseData } from '@vue3-system/axios';

// 创建请求实例
export const request = createRequest({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 15000,
});

// 导出类型
export type { ResponseData };

// 导出工具函数
export * from './utils';
