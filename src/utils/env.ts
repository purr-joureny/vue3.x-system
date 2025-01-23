/**
 * 获取环境变量
 * @param envKey 环境变量key
 * @param defaultValue 默认值
 */
export const getEnvValue = (envKey: keyof ImportMetaEnv, defaultValue = ''): string => {
    return import.meta.env[envKey] || defaultValue;
};

/**
 * 是否是开发环境
 */
export const isDev = (): boolean => {
    return import.meta.env.VITE_APP_ENV === 'development';
};

/**
 * 是否是生产环境
 */
export const isProd = (): boolean => {
    return import.meta.env.VITE_APP_ENV === 'production';
};

/**
 * 是否是测试环境
 */
export const isTest = (): boolean => {
    return import.meta.env.VITE_APP_ENV === 'test';
};

// 导出常用的环境变量
export const ENV = {
    VITE_APP_TITLE: getEnvValue('VITE_APP_TITLE'),
    VITE_APP_ENV: getEnvValue('VITE_APP_ENV'),
    VITE_API_BASE_URL: getEnvValue('VITE_API_BASE_URL'),
    VITE_UPLOAD_URL: getEnvValue('VITE_UPLOAD_URL'),
};
