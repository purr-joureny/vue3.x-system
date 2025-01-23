<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2 class="login-title">哔哩哔哩</h2>
        <p class="login-subtitle">欢迎回来</p>
      </template>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        status-icon
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <div class="remember-forgot">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          <el-link type="primary" :underline="false">忘记密码？</el-link>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
        <div class="register-link">
          还没有账号？
          <el-link type="primary" :underline="false" @click="goToRegister">
            立即注册
          </el-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import type { LoginParams } from "@/types/api";
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store/modules/app";

const router = useRouter();
const userStore = useUserStore();
const appStore = useAppStore();
const formRef = ref<FormInstance>();
const loading = ref(false);

// 使用 app store 中的记住密码状态
const rememberMe = ref(appStore.rememberPassword);

// 从 app store 获取保存的用户名
const form = reactive<LoginParams>({
  username: appStore.rememberedUsername || "",
  password: "",
});

const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
});

const handleLogin = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    loading.value = true;

    await userStore.login(form.username, form.password);

    // 更新记住密码状态和用户名;
    appStore.setRememberPassword(rememberMe.value);
    if (rememberMe.value) {
      appStore.setRememberedUsername(form.username);
    } else {
      appStore.setRememberedUsername("");
    }

    ElMessage.success("登录成功");
    router.push("/home");
  } catch (error: any) {
    console.error("Login error:", error);
    ElMessage.error(error.message || "登录失败，请重试");
  } finally {
    loading.value = false;
  }
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-card :deep(.el-card__header) {
  padding: 20px;
  text-align: center;
  border-bottom: none;
}

.login-title {
  margin: 0;
  font-size: 24px;
  color: #409eff;
}

.login-subtitle {
  margin: 10px 0 0;
  font-size: 16px;
  color: #606266;
}

.login-button {
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  border-radius: 4px;
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.register-link {
  text-align: center;
  margin-top: 16px;
  color: #606266;
}

:deep(.el-input__wrapper) {
  padding: 1px 11px;
}

:deep(.el-input__inner) {
  height: 40px;
}

:deep(.el-form-item__label) {
  padding-bottom: 8px;
}

:deep(.el-card__body) {
  padding: 30px;
}
</style>
