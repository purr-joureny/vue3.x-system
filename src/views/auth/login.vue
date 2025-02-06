<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import WechatLoginDialog from "@/components/WechatLoginDialog.vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { User, Lock, Position, ChatRound } from "@element-plus/icons-vue";
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
	username: appStore.rememberedUsername || "admin",
	password: "123456",
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

// 微信登录对话框可见性
const wechatLoginVisible = ref(false);

const handleWechatLogin = () => {
	wechatLoginVisible.value = true;
};

// 处理微信登录成功
const handleWechatLoginSuccess = async () => {
	try {
		loading.value = true;
		const result = await userStore.wechatLogin("1");

		if (result.data.isNewUser) {
			ElMessage.success("首次使用微信登录，欢迎加入我们！");
		} else {
			ElMessage.success("微信登录成功！");
		}

		router.push("/home");
	} catch (error: any) {
		console.error("WeChat login error:", error);
		ElMessage.error(error.message || "微信登录失败，请重试");
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div class="login-container">
		<el-card class="login-card">
			<template #header>
				<h2 class="login-title">后台管理</h2>
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

				<el-divider>
					<span style="color: #666; font-size: 14px">其他登录方式</span>
				</el-divider>

				<div class="social-login">
					<el-button class="wechat-button" @click="handleWechatLogin" text>
						<el-icon class="wechat-icon"><ChatRound /></el-icon>
						微信登录
					</el-button>
				</div>

				<div class="register-link">
					还没有账号？
					<el-link type="primary" :underline="false" @click="goToRegister">
						立即注册
					</el-link>
				</div>
			</el-form>
		</el-card>
		<WechatLoginDialog
			v-model:visible="wechatLoginVisible"
			@login-success="handleWechatLoginSuccess"
		/>
	</div>
</template>

<style scoped>
.login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	padding: 20px;
}

.login-card {
	width: 100%;
	max-width: 420px;
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

.login-title {
	margin: 0;
	font-size: 28px;
	color: #1a1a1a;
	text-align: center;
	font-weight: 600;
}

.login-subtitle {
	margin: 8px 0 0;
	color: #666;
	text-align: center;
	font-size: 16px;
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
}

.login-button {
	width: 100%;
	margin-top: 12px;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border: none;
	transition: transform 0.2s;
}

.login-button:hover {
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
	color: #666;
}

:deep(.el-checkbox__label) {
	color: #666;
}

:deep(.el-link) {
	font-size: 14px;
}

@media (max-width: 480px) {
	.login-card {
		margin: 20px;
	}

	.login-title {
		font-size: 24px;
	}

	.login-subtitle {
		font-size: 14px;
	}
}

.social-login {
	display: flex;
	justify-content: center;
	margin: 16px 0;
}

.wechat-button {
	color: #3668dd;
	font-size: 16px;
	transition: all 0.3s ease;
}

.wechat-button:hover {
	color: #3668dd;
	transform: scale(1.05);
}

.wechat-icon {
	margin-right: 8px;
	font-size: 18px;
}
</style>
