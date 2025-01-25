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
