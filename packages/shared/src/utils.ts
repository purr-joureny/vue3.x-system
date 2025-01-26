// 常用工具函数

// 本地存储
export const storage = {
    get(key: string) {
        const value = localStorage.getItem(key);
        try {
            return value ? JSON.parse(value) : null;
        } catch {
            return value;
        }
    },
    set(key: string, value: any) {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    },
    remove(key: string) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
};

// 日期格式化
export const formatDate = (date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss') => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', String(year))
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
};

// 数字格式化 - 添加千分位
export const formatNumber = (num: number | string): string => {
    return Number(num).toLocaleString('en-US');
};

// 金额格式化
export const formatMoney = (amount: number | string, decimals = 2): string => {
    return Number(amount).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 字符串截断
export const truncateString = (str: string, maxLength: number, suffix = '...'): string => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + suffix;
};

// 深拷贝
export const deepClone = <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj) as any;
    if (obj instanceof RegExp) return new RegExp(obj) as any;

    const clone = Array.isArray(obj) ? [] : {} as any;
    Object.keys(obj as any).forEach((key) => {
        clone[key] = deepClone((obj as any)[key]);
    });
    return clone;
};

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
    fn: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle = false;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// 随机字符串生成
export const randomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

// 是否为空值检查
export const isEmpty = (value: any): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
};

// URL参数解析
export const parseUrlParams = (url: string): Record<string, string> => {
    const params: Record<string, string> = {};
    new URL(url).searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
};

// 数组去重
export const uniqueArray = <T>(arr: T[]): T[] => {
    return Array.from(new Set(arr));
};
