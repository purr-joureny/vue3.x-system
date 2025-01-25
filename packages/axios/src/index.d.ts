import type { AxiosRequestConfig, AxiosInstance } from 'axios';

export interface RequestConfig {
    baseURL?: string;
    timeout?: number;
}

export interface ResponseData<T = any> {
    code: number;
    data: T;
    message: string;
}

export class Request {
    private instance: AxiosInstance;
    private config: RequestConfig;
    constructor(config: RequestConfig);
    getInstance(): AxiosInstance;
    request<T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>;
}

export function createRequest(config?: RequestConfig): Request;
