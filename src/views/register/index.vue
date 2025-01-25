<template>
	<div class="register-container">
		<div class="register-background">
			<div class="circle circle-1"></div>
			<div class="circle circle-2"></div>
			<div class="circle circle-3"></div>
		</div>

		<el-card class="register-card" :body-style="{ padding: 0 }">
			<div class="register-header">
				<div class="brand-logo">
					<el-icon class="logo-icon"><Monitor /></el-icon>
				</div>
				<h1 class="register-title">创建账户</h1>
				<p class="register-subtitle">加入我们，开启您的旅程</p>
			</div>

			<div class="register-form">
				<el-form
					ref="registerFormRef"
					:model="registerForm"
					:rules="registerRules"
					label-position="top"
				>
					<el-form-item label="用户名" prop="username">
						<el-input
							v-model="registerForm.username"
							placeholder="请输入用户名"
							:prefix-icon="User"
						/>
					</el-form-item>

					<el-form-item label="邮箱" prop="email">
						<el-input
							v-model="registerForm.email"
							placeholder="请输入邮箱"
							:prefix-icon="Message"
						/>
					</el-form-item>

					<el-form-item label="密码" prop="password">
						<el-input
							v-model="registerForm.password"
							type="password"
							placeholder="请输入密码"
							:prefix-icon="Lock"
							show-password
						/>
					</el-form-item>

					<el-form-item label="确认密码" prop="confirmPassword">
						<el-input
							v-model="registerForm.confirmPassword"
							type="password"
							placeholder="请再次输入密码"
							:prefix-icon="Lock"
							show-password
						/>
					</el-form-item>

					<el-button
						type="primary"
						:loading="loading"
						class="register-button"
						@click="handleRegister"
					>
						<span class="register-text">注 册</span>
					</el-button>
				</el-form>

				<div class="login-link">
					已有账户？
					<el-link type="primary" @click="goToLogin">立即登录</el-link>
				</div>

				<div class="terms-privacy">
					注册即表示您同意我们的
					<a href="#" @click.prevent="showTerms">服务条款</a>
					和
					<a href="#" @click.prevent="showPrivacy">隐私政策</a>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Lock, Message, Monitor } from "@element-plus/icons-vue";

const router = useRouter();
const loading = ref(false);
const registerFormRef = ref();

const registerForm = reactive({
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
});

const validatePass = (rule: any, value: string, callback: any) => {
	if (value === "") {
		callback(new Error("请再次输入密码"));
	} else if (value !== registerForm.password) {
		callback(new Error("两次输入密码不一致"));
	} else {
		callback();
	}
};

const registerRules = {
	username: [
		{ required: true, message: "请输入用户名", trigger: "blur" },
		{
			min: 3,
			max: 20,
			message: "用户名长度应在3-20个字符之间",
			trigger: "blur",
		},
	],
	email: [
		{ required: true, message: "请输入邮箱地址", trigger: "blur" },
		{ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
	],
	password: [
		{ required: true, message: "请输入密码", trigger: "blur" },
		{ min: 6, max: 20, message: "密码长度应在6-20个字符之间", trigger: "blur" },
	],
	confirmPassword: [
		{ required: true, message: "请再次输入密码", trigger: "blur" },
		{ validator: validatePass, trigger: "blur" },
	],
};

const handleRegister = async () => {
	if (!registerFormRef.value) return;

	try {
		await registerFormRef.value.validate();
		loading.value = true;

		// 模拟注册请求
		setTimeout(() => {
			ElMessage.success("注册成功");
			router.push("/login");
			loading.value = false;
		}, 1500);
	} catch (error) {
		console.error("表单验证失败:", error);
	}
};

const goToLogin = () => {
	router.push("/login");
};

const showTerms = () => {
	ElMessage.info("服务条款即将上线");
};

const showPrivacy = () => {
	ElMessage.info("隐私政策即将上线");
};
</script>

<style scoped>
@import "@/styles/register.css";
</style>
