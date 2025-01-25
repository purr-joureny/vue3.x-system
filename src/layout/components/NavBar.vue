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
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .left {
    display: flex;
    align-items: center;
    gap: 16px;

    .collapse-btn {
      cursor: pointer;
      font-size: 18px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      color: #666;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;

      &:hover {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
        transform: rotate(180deg);
      }

      &:active {
        transform: scale(0.95) rotate(180deg);
      }
    }

    :deep(.el-breadcrumb) {
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: #666;
          font-weight: normal;
          font-size: 14px;
          position: relative;
          transition: all 0.3s ease;
          
          &.is-link {
            color: #666;
            &:hover {
              color: var(--el-color-primary);
              transform: translateY(-1px);
            }

            &::after {
              content: '';
              position: absolute;
              bottom: -2px;
              left: 0;
              width: 100%;
              height: 1px;
              background-color: var(--el-color-primary);
              transform: scaleX(0);
              transition: transform 0.3s ease;
            }

            &:hover::after {
              transform: scaleX(1);
            }
          }
        }
        
        &:last-child {
          .el-breadcrumb__inner {
            color: #333;
            font-weight: 500;
          }
        }

        .el-breadcrumb__separator {
          color: #999;
          transition: transform 0.3s ease;
        }

        &:hover {
          .el-breadcrumb__separator {
            transform: scale(1.2);
          }
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;

    .user-dropdown {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;

      &:hover {
        background-color: #f5f5f5;
        transform: translateY(-1px);
      }

      &:active {
        transform: scale(0.98) translateY(-1px);
      }

      .el-avatar {
        border: 2px solid #fff;
        background: var(--el-color-primary);
        transition: all 0.3s ease;
        transform-origin: center;

        &:hover {
          transform: rotate(360deg);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      }

      .username {
        margin: 0 8px;
        font-size: 14px;
        color: #333;
        transition: all 0.3s ease;

        &:hover {
          color: var(--el-color-primary);
        }
      }

      .el-icon {
        font-size: 12px;
        color: #999;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:hover .el-icon {
        transform: rotate(180deg);
        color: var(--el-color-primary);
      }
    }
  }
}

:deep(.el-dropdown-menu) {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 4px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.el-popper {
    opacity: 1;
    transform: translateY(0);
  }

  .el-dropdown-menu__item {
    padding: 8px 16px;
    border-radius: 4px;
    margin: 0;
    font-size: 14px;
    color: #333;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left;

    &:hover {
      background-color: #f5f5f5;
      color: var(--el-color-danger);
      transform: scale(1.02);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0 12px;
  }
  
  .username {
    display: none;
  }
}
</style>
