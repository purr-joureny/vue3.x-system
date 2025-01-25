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
  // background-color: #ccc;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0 24px;

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
