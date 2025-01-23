import { defineStore, type PiniaPluginContext } from 'pinia';
import { ref } from 'vue';
import type { UserInfo } from '@/types/api';
import { userApi } from '@/api/user';
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';

export const useUserStore = defineStore(
    'user',
    () => {
        // 用户信息
        const userInfo = ref<UserInfo | null>(null);
        // token
        const token = ref<string>('');
        // 角色列表
        const roles = ref<string[]>([]);

        // 设置用户信息
        const setUserInfo = (info: UserInfo | null) => {
            userInfo.value = info;
            if (info) {
                roles.value = info.roles;
            }
        };

        // 设置 token
        const setToken = (newToken: string) => {
            token.value = newToken;
        };

        // 登录
        const login = async (username: string, password: string) => {
            try {
                // 模拟登录成功
                const mockToken = 'mock-token-' + Date.now();
                const mockUserInfo: UserInfo = {
                    id: 1,
                    username: username,
                    nickname: '模拟用户',
                    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
                    roles: ['user'],
                    email: 'mock@example.com',
                    createTime: new Date().toISOString(),
                    updateTime: new Date().toISOString()
                };

                setToken(mockToken);
                setUserInfo(mockUserInfo);
                return { code: 200, message: '登录成功', data: mockUserInfo };
            } catch (error) {
                throw error;
            }
        };

        // 获取用户信息
        const getUserInfo = async () => {
            try {
                const { data } = await userApi.getUserInfo();
                setUserInfo(data);
                return data;
            } catch (error) {
                throw error;
            }
        };

        // 退出登录
        const logout = async () => {
            try {
                // 模拟退出登录API调用
                await new Promise(resolve => setTimeout(resolve, 500));
                // 清除用户状态
                resetState();
                return { code: 200, message: '退出成功' };
            } catch (error) {
                throw error;
            }
        };

        // 重置状态
        const resetState = () => {
            userInfo.value = null;
            token.value = '';
            roles.value = [];
        };

        return {
            userInfo,
            token,
            roles,
            setUserInfo,
            setToken,
            login,
            getUserInfo,
            logout,
            resetState,
        };
    },
    {
        persist: {
            key: 'user-store',
            storage: localStorage,
            paths: ['token', 'userInfo', 'roles']
        } as PersistenceOptions
    }
);
