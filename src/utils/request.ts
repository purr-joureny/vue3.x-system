import { createRequest, Request } from '@dev-jury/axios';
import { ElMessage } from 'element-plus';
import router from '@/router';

// 创建请求实例
const requestInstance = createRequest({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15000,
}) as Request;

// 获取请求实例
const service = requestInstance.getInstance();

// 添加响应拦截器处理业务逻辑
service.interceptors.response.use(
    (response) => {
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
    (error: { response: { status: any; }; message: any; }) => {
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

// 导出请求方法
export const { get, post, put, delete: del } = service;

export default service;
