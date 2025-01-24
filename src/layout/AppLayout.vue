<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import NavBar from "./components/NavBar.vue";
import SideMenu from "./components/SideMenu.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const router = useRouter();

// 配置 NProgress
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  easing: "ease",
  speed: 200,
});

// 路由守卫处理
onBeforeMount(() => {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });

  router.onError(() => {
    NProgress.done();
  });
});
</script>

<template>
  <el-container class="layout-container">
    <SideMenu />
    <el-container class="main-container">
      <NavBar />
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .el-main {
      flex: 1;
      padding: 20px;
      background-color: #f1f5f9;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #d1d5db;
        border-radius: 3px;

        &:hover {
          background-color: #9ca3af;
        }
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
    }
  }
}

// 路由过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
