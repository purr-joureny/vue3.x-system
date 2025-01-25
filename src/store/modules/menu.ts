import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { MenuItem, MenuState } from '@/types/menu';
import * as menuApi from '@/api/menu';
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';

export const useMenuStore = defineStore(
    'menu',
    () => {
        const menus = ref<MenuItem[]>([]);
        const loading = ref(false);
        const error = ref<string | null>(null);

        // 获取菜单列表
        const fetchMenus = async () => {
            try {
                loading.value = true;
                error.value = null;
                const response = await menuApi.getMenuList();
                menus.value = response.data;
            } catch (err) {
                error.value = err instanceof Error ? err.message : '获取菜单失败';
                console.error('Failed to fetch menus:', err);
            } finally {
                loading.value = false;
            }
        };

        // 根据用户ID获取菜单
        const fetchUserMenus = async (userId: string) => {
            console.log('fetchUserMenus', userId);
            try {
                loading.value = true;
                error.value = null;
                const response = await menuApi.getUserMenus(userId);
                menus.value = response.data;
            } catch (err) {
                error.value = err instanceof Error ? err.message : '获取用户菜单失败';
                console.error('Failed to fetch user menus:', err);
            } finally {
                loading.value = false;
            }
        };

        // 清除菜单数据
        const clearMenus = () => {
            menus.value = [];
            error.value = null;
        };

        return {
            menus,
            loading,
            error,
            fetchMenus,
            fetchUserMenus,
            clearMenus,
        };
    },
    {
        persist: {
            key: 'menu-store',
            paths: ['menus'],
        } as PersistenceOptions,
    }
);
