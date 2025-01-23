<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useLayoutStore } from "@/store/modules/layout";
import { useMenuStore } from "@/store/modules/menu";
import { useRouter, useRoute } from "vue-router";
import {
  HomeFilled,
  VideoCamera,
  UserFilled,
  Setting,
  Fold,
  Expand,
  ArrowDown,
} from "@element-plus/icons-vue";

// 图标映射
const iconMap: Record<string, any> = {
  HomeFilled,
  VideoCamera,
  UserFilled,
  Setting,
};

const userStore = useUserStore();
const layoutStore = useLayoutStore();
const menuStore = useMenuStore();
const router = useRouter();
const route = useRoute();

// 获取菜单数据
onMounted(async () => {
  if (userStore.userInfo?.id) {
    await menuStore.fetchUserMenus(String(userStore.userInfo.id));
  } else {
    await menuStore.fetchMenus();
  }
});

// 计算当前激活的菜单项
const activeMenu = computed(() => {
  const { path } = route;
  const matchedRoute = route.matched[route.matched.length - 1];
  if (matchedRoute && matchedRoute.meta.activeMenu) {
    return matchedRoute.meta.activeMenu;
  }
  return path;
});

// 计算默认展开的子菜单
const defaultOpeneds = computed(() => {
  const { path } = route;
  const openedMenus: string[] = [];

  const findParentMenus = (menus: any[], targetPath: string) => {
    for (const menu of menus) {
      if (menu.children) {
        if (menu.children.some((child: any) => child.path === targetPath)) {
          openedMenus.push(menu.index);
        }
        findParentMenus(menu.children, targetPath);
      }
    }
  };

  findParentMenus(menuStore.menus, path);
  return openedMenus;
});

// 计算面包屑
const breadcrumbs = computed(() => {
  const currentRoute = route;
  const items = [{ title: "首页", path: "/home" }];

  if (currentRoute.meta?.title) {
    items.push({
      title: currentRoute.meta.title as string,
      path: currentRoute.path,
    });
  }

  return items;
});

const breadcrumbItems = computed(() => {
  return breadcrumbs.value.map((item) => item.title);
});

const handleLogout = async () => {
  await userStore.logout();
  router.push("/login");
};

const toggleCollapse = () => {
  layoutStore.setCollapse(!layoutStore.isCollapse);
};

const handleCommand = (command: string) => {
  if (command === "logout") {
    handleLogout();
  }
};
</script>

<template>
  <el-container class="layout-container">
    <el-aside :width="layoutStore.isCollapse ? '64px' : '200px'" class="aside">
      <div class="logo">
        <el-icon size="24" color="#ffffff"><VideoCamera /></el-icon>
        <span class="logo-text" v-if="!layoutStore.isCollapse">哔哩系统</span>
      </div>
      <div class="menu-container">
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            :default-openeds="defaultOpeneds"
            class="menu"
            :collapse="layoutStore.isCollapse"
            background-color="#1f2937"
            text-color="#94a3b8"
            active-text-color="#ffffff"
            :collapse-transition="false"
            unique-opened
            router
          >
            <template v-for="item in menuStore.menus" :key="item.index">
              <el-sub-menu v-if="item.children?.length" :index="item.index">
                <template #title>
                  <el-icon><component :is="iconMap[item.icon!]" /></el-icon>
                  <span>{{ item.title }}</span>
                </template>
                <el-menu-item
                  v-for="child in item.children"
                  :key="child.index"
                  :index="child.path"
                >
                  {{ child.title }}
                </el-menu-item>
              </el-sub-menu>

              <el-menu-item v-else :index="item.path">
                <el-icon><component :is="iconMap[item.icon!]" /></el-icon>
                <template #title>{{ item.title }}</template>
              </el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>

    <el-container class="main-container">
      <el-header class="header">
        <div class="left">
          <el-icon class="collapse-btn" @click="toggleCollapse">
            <component :is="layoutStore.isCollapse ? Expand : Fold" />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item">
              {{ item }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="right">
          <el-dropdown @command="handleCommand">
            <span class="user-dropdown">
              <el-avatar :size="32" :src="userStore.userInfo?.avatar">
                {{
                  userStore.userInfo?.nickname?.[0] ||
                  userStore.userInfo?.username?.[0]
                }}
              </el-avatar>
              <span class="username">{{
                userStore.userInfo?.nickname || userStore.userInfo?.username
              }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .aside {
    transition: width 0.3s;
    background-color: #1f2937;
    overflow: hidden;

    .menu-container {
      height: 100%;
      border-right: none;
      background-color: transparent;

      :deep(.el-menu) {
        border-right: none;
        background-color: transparent;
      }

      :deep(.el-menu-item) {
        height: 50px;
        line-height: 50px;
        color: #94a3b8;

        &:hover {
          background-color: #374151;
          color: #ffffff;
        }

        &.is-active {
          background-color: #3b82f6;
          color: #ffffff;

          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background-color: #ffffff;
          }
        }

        .el-icon {
          font-size: 18px;
          margin-right: 12px;
        }
      }

      :deep(.el-sub-menu) {
        .el-sub-menu__title {
          height: 50px;
          line-height: 50px;
          color: #94a3b8;

          &:hover {
            background-color: #374151;
            color: #ffffff;
          }

          .el-icon {
            font-size: 18px;
            margin-right: 12px;
          }
        }

        .el-menu--inline {
          background-color: #111827;
          padding-left: 8px;

          .el-menu-item {
            padding-left: 40px !important;
            min-width: auto;
            background-color: transparent;

            &::before {
              left: -8px;
            }

            &:hover {
              background-color: #1f2937;
            }

            &.is-active {
              background-color: #3b82f6;
            }
          }
        }
      }
    }
  }

  .main-container {
    background-color: #f1f5f9;
    padding: 20px;
    overflow-y: auto;
  }
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111827;
  overflow: hidden;

  .logo-text {
    margin-left: 12px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    transition: opacity 0.3s;
  }
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  .left {
    display: flex;
    align-items: center;
    gap: 16px;

    .collapse-btn {
      cursor: pointer;
      font-size: 20px;
      color: #666;
      transition: color 0.3s;

      &:hover {
        color: #409eff;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 16px;

    .user-dropdown {
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 8px;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f3f4f6;
      }

      .username {
        font-size: 14px;
        color: #1f2937;
        margin: 0 4px;
      }

      .el-icon {
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>
