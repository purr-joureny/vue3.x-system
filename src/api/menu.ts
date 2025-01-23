import type { MenuItem } from '@/types/menu';
import { mockMenus, mockUserMenus } from '@/mock/menuMock';

// 模拟API响应延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 获取所有菜单列表
export const getMenuList = async () => {
  await delay(500); // 模拟网络延迟
  return {
    code: 200,
    data: mockMenus,
    message: 'success'
  };
};

// 根据用户ID获取菜单列表
export const getUserMenus = async (userId: string) => {
  await delay(500); // 模拟网络延迟
  return {
    code: 200,
    data: mockUserMenus(userId),
    message: 'success'
  };
};
