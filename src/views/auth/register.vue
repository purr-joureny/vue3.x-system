<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <h2 class="register-title">注册账号</h2>
      </template>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleRegister"
            >注册</el-button
          >
          <el-button @click="goToLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { userApi } from "@/api/user";
import type { RegisterParams } from "@/types/api";

const router = useRouter();
const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive<RegisterParams>({
  username: "",
  password: "",
  confirmPassword: "",
});

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== form.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: "blur" },
  ],
});

const handleRegister = async () => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validate();
    loading.value = true;

    await userApi.register(form);
    ElMessage.success("注册成功，请登录");
    router.push("/login");
  } catch (error: any) {
    console.error("Register error:", error);
    ElMessage.error(error.message || "注册失败，请重试");
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.register-title {
  margin: 0;
  font-size: 28px;
  color: #1a1a1a;
  text-align: center;
  font-weight: 600;
}

:deep(.el-form) {
  padding: 20px;
}

:deep(.el-form-item) {
  margin-bottom: 24px;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  height: 44px;
}

:deep(.el-input__inner) {
  height: 44px;
}

:deep(.el-button) {
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
  margin-right: 12px;
}

:deep(.el-button--primary) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: transform 0.2s;
  min-width: 120px;
}

:deep(.el-button--primary:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.el-button--default) {
  border: 1px solid #dcdfe6;
  min-width: 120px;
}

:deep(.el-button--default:hover) {
  border-color: #764ba2;
  color: #764ba2;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #1a1a1a;
}

@media (max-width: 480px) {
  .register-card {
    margin: 20px;
  }
  
  .register-title {
    font-size: 24px;
  }
  
  :deep(.el-form-item__label) {
    font-size: 14px;
  }
  
  :deep(.el-button) {
    min-width: auto;
    margin-bottom: 10px;
  }
}
</style>
