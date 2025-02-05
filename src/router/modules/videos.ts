import type { RouteRecordRaw } from 'vue-router';

export const videoRoutes: RouteRecordRaw[] = [
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
  }
];
