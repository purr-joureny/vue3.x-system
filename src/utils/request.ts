import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { ENV } from './env';

// 创建 axios 实例
const service: AxiosInstance = axios.create({
    baseURL: ENV.VITE_API_BASE_URL,  // 从环境变量获取 API 基础 URL
    timeout: 15000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 从 localStorage 获取 token
        const token = localStorage.getItem('token');
        if (token) {
            // 添加 token 到请求头
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const { code, message, data } = response.data;

        // 根据自定义错误码判断请求是否成功
        if (code === 200) {
            // 成功返回数据
            return data;
        } else {
            // 处理业务错误
            ElMessage.error(message || '操作失败');
            return Promise.reject(new Error(message || '操作失败'));
        }
    },
    (error: any) => {
        const { status } = error.response || {};

        // 处理 HTTP 错误状态
        switch (status) {
            case 401:
                ElMessage.error('登录已过期，请重新登录');
                // 清除本地存储的 token
                localStorage.removeItem('token');
                // 重定向到登录页
                router.push('/login');
                break;
            case 403:
                ElMessage.error('没有权限访问该资源');
                break;
            case 404:
                ElMessage.error('请求的资源不存在');
                break;
            case 500:
                ElMessage.error('服务器错误，请稍后重试');
                break;
            default:
                ElMessage.error(error.message || '网络错误，请稍后重试');
        }

        return Promise.reject(error);
    }
);

// 封装 GET 请求
export const get = <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
    return service.get(url, { params, ...config });
};

// 封装 POST 请求
export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return service.post(url, data, config);
};

// 封装 PUT 请求
export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return service.put(url, data, config);
};

// 封装 DELETE 请求
export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return service.delete(url, config);
};

export default service;
