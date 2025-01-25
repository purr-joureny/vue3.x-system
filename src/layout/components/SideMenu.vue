<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useLayoutStore } from "@/store/modules/layout";
import { useMenuStore } from "@/store/modules/menu";
import { useRoute } from "vue-router";
import {
  HomeFilled,
  VideoCamera,
  Platform,
  UserFilled,
  Setting,
} from "@element-plus/icons-vue";

// 图标映射
const iconMap: Record<string, any> = {
  HomeFilled,
  Platform,
  VideoCamera,
  UserFilled,
  Setting,
};

const userStore = useUserStore();
const layoutStore = useLayoutStore();
const menuStore = useMenuStore();
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
</script>

<template>
  <el-aside :width="layoutStore.isCollapse ? '64px' : '200px'" class="aside">
    <div class="logo">
      <el-icon size="24" color="#ffffff"><Platform /></el-icon>
      <span class="logo-text" v-if="!layoutStore.isCollapse">后台管理</span>
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
</template>

<style lang="scss" scoped>
.aside {
  transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  background-color: #111827;
  overflow: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .menu-container {
    height: calc(100% - 64px);
    border-right: none;
    background-color: transparent;

    :deep(.el-menu) {
      border-right: none;
      background-color: transparent;
      //   padding: 12px;
    }

    :deep(.el-menu-item) {
      height: 48px;
      line-height: 48px;
      color: #9ca3af;
      margin: 4px 0;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
        color: #ffffff;
        padding-left: 24px;
        transform: translateX(2px);
      }

      &.is-active {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: #ffffff;
        font-weight: 500;
        padding-left: 24px;
        box-shadow: 0 4px 15px -3px rgba(59, 130, 246, 0.5);
        transform: translateX(2px);

        &::before {
          display: none;
        }

        .el-icon {
          transform: scale(1.1);
        }
      }

      .el-icon {
        font-size: 18px;
        margin-right: 12px;
        transition: all 0.3s ease;
      }

      &:hover .el-icon {
        transform: translateX(2px) scale(1.1);
      }
    }

    :deep(.el-sub-menu) {
      .el-sub-menu__title {
        height: 48px;
        line-height: 48px;
        color: #9ca3af;
        margin: 4px 0;
        border-radius: 10px;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

        &:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          padding-left: 24px;
          transform: translateX(2px);

          .el-sub-menu__icon-arrow {
            transform: rotate(180deg);
          }
        }

        .el-icon {
          font-size: 18px;
          margin-right: 12px;
          transition: all 0.3s ease;
        }

        &:hover .el-icon {
          transform: translateX(2px) scale(1.1);
        }

        .el-sub-menu__icon-arrow {
          transition: transform 0.3s ease;
        }
      }

      .el-menu--inline {
        padding: 4px 8px;
        margin: 4px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        backdrop-filter: blur(10px);

        .el-menu-item {
          margin: 4px 0;
          padding-left: 44px !important;
          min-width: auto;
          border-radius: 6px;
          height: 40px;
          line-height: 40px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-size: 13px;

          &:hover {
            background-color: rgba(255, 255, 255, 0.05);
            padding-left: 48px !important;
            transform: translateX(2px);
          }

          &.is-active {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            padding-left: 48px !important;
          }
        }
      }
    }
  }
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f172a;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &:hover {
    background-color: #1e293b;

    .el-icon {
      transform: scale(1.1) rotate(360deg);
      color: #60a5fa;
    }

    .logo-text {
      color: #60a5fa;
    }
  }

  .el-icon {
    font-size: 24px;
    color: #3b82f6;
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .logo-text {
    margin-left: 12px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    transition: all 0.3s ease;
    background: linear-gradient(to right, #ffffff, #93c5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

:deep(.el-scrollbar__view) {
  padding: 4px;
}

:deep(.el-menu--collapse) {
  .el-sub-menu__title span,
  .el-menu-item span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }

  .el-menu-item,
  .el-sub-menu__title {
    padding-left: 20px !important;

    &:hover {
      padding-left: 22px !important;
    }

    .el-icon {
      margin: 0;
    }
  }
}
</style>
