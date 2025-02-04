import { defineStore } from 'pinia';
import { ref } from 'vue';
// import type { PersistenceOptions } from 'pinia-plugin-persistedstate';

export const useAppStore = defineStore(
  'app',
  () => {
    // 侧边栏折叠状态
    const sidebarCollapsed = ref(false);
    // 主题色
    const primaryColor = ref('#409EFF');
    // 记住密码
    const rememberPassword = ref(false);
    // 记住的用户名
    const rememberedUsername = ref('');

    // 切换侧边栏状态
    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value;
    };

    // 设置主题色
    const setPrimaryColor = (color: string) => {
      primaryColor.value = color;
    };

    // 设置记住密码
    const setRememberPassword = (value: boolean) => {
      rememberPassword.value = value;
    };

    // 设置记住的用户名
    const setRememberedUsername = (username: string) => {
      rememberedUsername.value = username;
    };

    return {
      sidebarCollapsed,
      primaryColor,
      rememberPassword,
      rememberedUsername,
      toggleSidebar,
      setPrimaryColor,
      setRememberPassword,
      setRememberedUsername,
    };
  },
  {
    persist: {
      key: 'app-store',
      storage: localStorage,
    },
  }
);
