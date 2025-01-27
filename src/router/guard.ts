import type { Router } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { whiteList } from './constants';

export function setupGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore();
        const token = userStore.token;

        if (token) {
            if (to.path === '/login' || to.path === '/register') {
                // 已登录用户重定向到首页
                next('/home');
            } else {
                // 已登录且访问其他页面
                // 如果没有用户信息，先获取用户信息
                if (!userStore.userInfo) {
                    try {
                        await userStore.getUserInfo();
                        next();
                    } catch (error) {
                        // 获取用户信息失败，可能是 token 过期
                        userStore.resetState();
                        next('/login');
                    }
                } else {
                    next();
                }
            }
        } else {
            // 未登录
            if (whiteList.includes(to.path as '/login' | '/register')) {
                // 未登录可以访问白名单页面
                next();
            } else {
                // 未登录且访问非白名单页面，重定向到登录页
                next('/login');
            }
        }
    });
}
