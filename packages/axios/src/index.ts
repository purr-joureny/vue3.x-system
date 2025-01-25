import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface RequestConfig {
    baseURL?: string;
    timeout?: number;
}

export interface ResponseData<T = any> {
    code: number;
    message: string;
    data: T;
}

export class Request {
    private instance: AxiosInstance;
    public config: RequestConfig;

    constructor(config: RequestConfig) {
        this.config = config;
        this.instance = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout || 15000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        this.setupInterceptors();
    }

    get interceptors() {
        return this.instance.interceptors;
    }

    public getInstance(): AxiosInstance {
        return this.instance;
    }

    private setupInterceptors() {
        // 请求拦截器
        this.instance.interceptors.request.use(
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
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response.data;
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );
    }

    // 封装 GET 请求
    public get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.get(url, { params, ...config });
    }

    // 封装 POST 请求
    public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.post(url, data, config);
    }

    // 封装 PUT 请求
    public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.put(url, data, config);
    }

    // 封装 DELETE 请求
    public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.delete(url, config);
    }
}

export function createRequest(config: RequestConfig): Request {
    return new Request(config);
}
