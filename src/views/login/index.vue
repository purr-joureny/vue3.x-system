<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Lock, Monitor } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";

const router = useRouter();
const userStore = useUserStore();
const loading = ref(false);
const loginFormRef = ref();

const loginForm = reactive({
	username: "",
	password: "",
	remember: false,
});

// 初始化时检查是否有记住的用户名
onMounted(() => {
	const rememberedUsername = localStorage.getItem("username");
	const isRemembered = localStorage.getItem("remember") === "true";
	if (rememberedUsername && isRemembered) {
		loginForm.username = rememberedUsername;
		loginForm.remember = true;
	}
});

const loginRules = {
	username: [
		{ required: true, message: "请输入用户名", trigger: "blur" },
		{
			min: 3,
			max: 20,
			message: "用户名长度应在3-20个字符之间",
			trigger: "blur",
		},
	],
	password: [
		{ required: true, message: "请输入密码", trigger: "blur" },
		{ min: 6, max: 20, message: "密码长度应在6-20个字符之间", trigger: "blur" },
	],
};

const handleLogin = async () => {
	if (!loginFormRef.value) return;

	try {
		await loginFormRef.value.validate();
		loading.value = true;

		// 调用 store 的登录方法，传入记住我的状态
		const result = await userStore.login(
			loginForm.username,
			loginForm.password,
			loginForm.remember,
		);
		if (result.code === 200) {
			ElMessage.success("登录成功");
			router.push("/home");
		} else {
			ElMessage.error(result.message || "登录失败");
		}
	} catch (error) {
		console.error("登录失败:", error);
		ElMessage.error("登录失败，请重试");
	} finally {
		loading.value = false;
	}
};

const goToRegister = () => {
	router.push("/register");
};
</script>

<template>
	<div class="login-container">
		<div class="login-background">
			<div class="circle circle-1"></div>
			<div class="circle circle-2"></div>
			<div class="circle circle-3"></div>
		</div>

		<el-card class="login-card" :body-style="{ padding: 0 }">
			<div class="login-header">
				<div class="brand-logo">
					<el-icon class="logo-icon"><Monitor /></el-icon>
				</div>
				<h1 class="login-title">欢迎回来</h1>
				<p class="login-subtitle">登录您的账户继续访问</p>
			</div>

			<div class="login-form">
				<el-form
					ref="loginFormRef"
					:model="loginForm"
					:rules="loginRules"
					label-position="top"
				>
					<el-form-item label="用户名" prop="username">
						<el-input
							v-model="loginForm.username"
							placeholder="请输入用户名"
							:prefix-icon="User"
						/>
					</el-form-item>

					<el-form-item label="密码" prop="password">
						<el-input
							v-model="loginForm.password"
							type="password"
							placeholder="请输入密码"
							:prefix-icon="Lock"
							show-password
						/>
					</el-form-item>

					<div class="remember-forgot">
						<el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
						<a href="#" class="forgot-password">忘记密码？</a>
					</div>

					<el-button
						type="primary"
						:loading="loading"
						class="login-button"
						@click="handleLogin"
					>
						<span class="login-text">登 录</span>
					</el-button>
				</el-form>

				<div class="register-link">
					还没有账户？
					<el-link type="primary" @click="goToRegister">立即注册</el-link>
				</div>
			</div>
		</el-card>
	</div>
</template>

<style scoped>
@import "@/styles/login.css";
</style>
