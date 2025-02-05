// src/router/index.ts
// 创建路由 路由模式 路由类型
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { authRoutes } from './modules/auth';
import { videoRoutes } from './modules/videos';
import { userRoutes } from './modules/users';
import { setupGuard } from './guard';

const routes: RouteRecordRaw[] = [
  ...authRoutes,
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
      ...videoRoutes,
      ...userRoutes,
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

// 设置路由守卫
setupGuard(router);

export default router;