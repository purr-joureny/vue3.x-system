import type { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
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
    }
];
