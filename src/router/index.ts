// src/router/index.ts
// 创建路由 路由模式 路由类型
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store/modules/user';

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/login.vue'),
        meta: {
            title: '登录',
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/register.vue'),
        meta: {
            title: '注册',
            requiresAuth: false
        }
    },
    {
        path: '/',
        component: () => import('@/layout/AppLayout.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/dashboard/home.vue'),
                meta: {
                    title: '首页',
                    requiresAuth: true
                }
            },
            {
                path: 'videos',
                name: 'Videos',
                component: () => import('@/views/videos/index.vue'),
                redirect: { name: 'VideoUpload' },
                meta: {
                    title: '视频管理',
                    requiresAuth: true
                },
                children: [
                    {
                        path: 'list',
                        name: 'VideoList',
                        component: () => import('@/views/videos/list.vue'),
                        meta: {
                            title: '视频列表',
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'upload',
                        name: 'VideoUpload',
                        component: () => import('@/views/videos/upload.vue'),
                        meta: {
                            title: '上传视频',
                            requiresAuth: true
                        }
                    }
                ]
            },
            {
                path: 'users',
                name: 'Users',
                component: () => import('@/views/users/index.vue'),
                redirect: { name: 'UserList' },
                meta: {
                    title: '用户管理',
                    requiresAuth: true
                },
                children: [
                    {
                        path: 'list',
                        name: 'UserList',
                        component: () => import('@/views/users/list.vue'),
                        meta: {
                            title: '用户列表',
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'permissions',
                        name: 'Permissions',
                        component: () => import('@/views/users/permissions.vue'),
                        meta: {
                            title: '权限管理',
                            requiresAuth: true
                        }
                    }
                ]
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import('@/views/settings/setting.vue'),
                meta: {
                    title: '系统设置',
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: () => import('@/views/error/not-found.vue'),
        meta: {
            title: '404',
            requiresAuth: false
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 白名单路由
const whiteList = ['/login', '/register'];

// 全局前置守卫
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
        if (whiteList.includes(to.path)) {
            // 未登录可以访问白名单页面
            next();
        } else {
            // 未登录且访问非白名单页面，重定向到登录页
            next('/login');
        }
    }
});

export default router;