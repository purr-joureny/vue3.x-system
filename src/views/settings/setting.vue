<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";

interface SystemSettings {
  theme: string;
  language: string;
  notifications: {
    email: boolean;
    browser: boolean;
    desktop: boolean;
  };
  autoSave: boolean;
  pageSize: number;
}

const formRef = ref<FormInstance>();
const settings = reactive<SystemSettings>({
  theme: "light",
  language: "zh-CN",
  notifications: {
    email: true,
    browser: true,
    desktop: false,
  },
  autoSave: true,
  pageSize: 10,
});

const rules = reactive<FormRules>({
  theme: [{ required: true, message: "请选择主题", trigger: "change" }],
  language: [{ required: true, message: "请选择语言", trigger: "change" }],
  pageSize: [
    { required: true, message: "请输入每页显示条数", trigger: "blur" },
    {
      type: "number",
      min: 5,
      max: 100,
      message: "每页显示条数必须在5-100之间",
      trigger: "blur",
    },
  ],
});

const themeOptions = [
  { label: "浅色主题", value: "light" },
  { label: "深色主题", value: "dark" },
  { label: "系统主题", value: "system" },
];

const languageOptions = [
  { label: "简体中文", value: "zh-CN" },
  { label: "英文", value: "en-US" },
];

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("保存设置:", settings);
      // TODO: 调用API保存设置
    } else {
      console.error("表单验证失败:", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <div class="settings-container">
    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <span>系统设置</span>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="settings"
        :rules="rules"
        label-width="120px"
        class="settings-form"
      >
        <el-form-item label="主题设置" prop="theme">
          <el-select v-model="settings.theme" placeholder="请选择主题">
            <el-option
              v-for="option in themeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="系统语言" prop="language">
          <el-select v-model="settings.language" placeholder="请选择语言">
            <el-option
              v-for="option in languageOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="通知设置">
          <el-space direction="vertical" alignment="flex-start" :size="16">
            <el-checkbox v-model="settings.notifications.email">
              接收邮件通知
            </el-checkbox>
            <el-checkbox v-model="settings.notifications.browser">
              接收浏览器通知
            </el-checkbox>
            <el-checkbox v-model="settings.notifications.desktop">
              接收桌面通知
            </el-checkbox>
          </el-space>
        </el-form-item>

        <el-form-item label="自动保存">
          <el-switch v-model="settings.autoSave" />
        </el-form-item>

        <el-form-item label="每页显示条数" prop="pageSize">
          <el-input-number
            v-model="settings.pageSize"
            :min="5"
            :max="100"
            :step="5"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit(formRef)">
            保存设置
          </el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.settings-container {
  padding: 20px;

  .settings-card {
    max-width: 800px;
    margin: 0 auto;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 16px;
        font-weight: 600;
      }
    }

    .settings-form {
      margin-top: 20px;

      :deep(.el-select) {
        width: 240px;
      }

      .el-button {
        margin-right: 16px;
      }
    }
  }
}
</style>
