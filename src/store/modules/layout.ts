import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';

export const useLayoutStore = defineStore(
    'layout',
    () => {
        const isCollapse = ref(false);
        const activeMenu = ref('1');
        const activeSubMenu = ref('');

        // 设置菜单折叠状态
        const setCollapse = (collapse: boolean) => {
            isCollapse.value = collapse;
        };

        // 设置当前激活的菜单
        const setActiveMenu = (menuIndex: string, subMenuIndex?: string) => {
            activeMenu.value = menuIndex;
            if (subMenuIndex) {
                activeSubMenu.value = subMenuIndex;
            }
        };

        return {
            isCollapse,
            activeMenu,
            activeSubMenu,
            setCollapse,
            setActiveMenu
        };
    },
    {
        persist: {
            key: 'layout',
            paths: ['isCollapse', 'activeMenu', 'activeSubMenu']
        } as PersistenceOptions
    }
);
