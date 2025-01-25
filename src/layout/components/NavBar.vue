<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useLayoutStore } from "@/store/modules/layout";
import { useRouter, useRoute } from "vue-router";
import { Fold, Expand, ArrowDown } from "@element-plus/icons-vue";

const userStore = useUserStore();
const layoutStore = useLayoutStore();
const router = useRouter();
const route = useRoute();

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
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;

  .left {
    display: flex;
    align-items: center;
    gap: 20px;

    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      font-size: 18px;
      color: #64748b;
      cursor: pointer;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      background-color: transparent;

      &:hover {
        color: #3b82f6;
        background-color: #f1f5f9;
        transform: rotate(180deg) scale(1.05);
      }

      &:active {
        transform: rotate(180deg) scale(0.95);
      }
    }

    :deep(.el-breadcrumb) {
      line-height: 1;
      
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: #64748b;
          font-weight: normal;
          transition: all 0.3s ease;
          font-size: 14px;
          
          &.is-link {
            color: #3b82f6;
            font-weight: 500;
            
            &:hover {
              color: #2563eb;
              text-decoration: none;
              transform: translateY(-1px);
            }
          }
        }

        &:last-child {
          .el-breadcrumb__inner {
            color: #0f172a;
            font-weight: 600;
          }
        }

        .el-breadcrumb__separator {
          color: #94a3b8;
          margin: 0 8px;
          font-weight: 300;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 24px;

    .user-dropdown {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 16px;
      cursor: pointer;
      border-radius: 12px;
      background-color: transparent;
      border: 1px solid transparent;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

      &:hover {
        background-color: #f8fafc;
        border-color: #e2e8f0;
        transform: translateY(-1px);

        .el-icon {
          transform: rotate(180deg);
        }

        .username {
          color: #2563eb;
        }
      }

      &:active {
        transform: translateY(0);
      }

      :deep(.el-avatar) {
        border: 2px solid #e2e8f0;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;

        &:hover {
          border-color: #3b82f6;
          transform: scale(1.08);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      }

      .username {
        font-size: 14px;
        font-weight: 500;
        color: #334155;
        margin: 0 4px;
        transition: color 0.3s ease;
      }

      .el-icon {
        font-size: 14px;
        color: #64748b;
        transition: all 0.3s ease;
      }
    }

    :deep(.el-dropdown-menu) {
      padding: 8px;
      border: none;
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
                  0 8px 10px -6px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(229, 231, 235, 0.5);
      transform-origin: top right;
      animation: dropdown 0.2s ease-out;

      .el-dropdown-menu__item {
        padding: 12px 18px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        margin: 2px 0;

        &:hover {
          background-color: #f1f5f9;
          color: #3b82f6;
          transform: translateX(2px);
        }

        &.el-dropdown-menu__item--divided {
          position: relative;
          border-top: 1px solid #e2e8f0;
          margin-top: 8px;
          padding-top: 8px;

          &:hover {
            color: #ef4444;
            background-color: #fef2f2;
          }
        }
      }
    }
  }
}

@keyframes dropdown {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
