import type { MenuItem } from '@/types/menu';

export const mockMenus: MenuItem[] = [
    {
        id: '1',
        index: '1',
        title: '首页',
        icon: 'HomeFilled',
        path: '/home'
    },
    {
        id: '2',
        index: '2',
        title: '视频管理',
        icon: 'VideoCamera',
        children: [
            {
                id: '2-1',
                index: '2-1',
                title: '视频上传',
                path: '/videos/upload'
            },
            {
                id: '2-2',
                index: '2-2',
                title: '视频列表',
                path: '/videos/list'
            }
        ]
    },
    {
        id: '3',
        index: '3',
        title: '用户管理',
        icon: 'UserFilled',
        children: [
            {
                id: '3-1',
                index: '3-1',
                title: '用户列表',
                path: '/users/list'
            },
            {
                id: '3-2',
                index: '3-2',
                title: '用户权限',
                path: '/users/permissions'
            }
        ]
    },
    {
        id: '4',
        index: '4',
        title: '系统设置',
        icon: 'Setting',
        path: '/settings'
    }
];

export const mockUserMenus = (userId: string): MenuItem[] => {
    // 模拟不同用户可能有不同的菜单权限
    if (userId === '1') {
        // 管理员拥有所有菜单权限
        return mockMenus;
    }
    // 普通用户只有部分菜单权限
    return mockMenus.filter(menu => menu.id !== '3');
};
