<template>
	<el-dialog
		v-model="dialogVisible"
		title="微信扫码登录"
		width="360px"
		:close-on-click-modal="false"
		:show-close="true"
		@close="handleClose"
	>
		<div class="qrcode-container">
			<div v-if="!isScanned" class="qrcode">
				<img :src="qrCodeUrl" alt="微信登录二维码" />
				<p class="tip">请使用微信扫码登录</p>
			</div>
			<div v-else class="scanned">
				<el-icon class="success-icon" color="#07C160"
					><CircleCheckFilled
				/></el-icon>
				<p class="tip">扫描成功</p>
				<p class="sub-tip">请在手机上确认登录</p>
			</div>
			<div class="refresh" v-if="isExpired">
				<p class="expired-tip">二维码已过期</p>
				<el-button type="primary" @click="refreshQrCode">刷新二维码</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch } from "vue";
import { CircleCheckFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { getLoginQrCode, checkScanStatus } from "@/api/wechat";
import { useUserStore } from "@/store/modules/user";

const props = defineProps<{
	visible: boolean;
}>();

const emit = defineEmits<{
	(e: "update:visible", value: boolean): void;
	(e: "login-success"): void;
}>();

const userStore = useUserStore();
const dialogVisible = ref(props.visible);
const isScanned = ref(false);
const isExpired = ref(false);
const qrCodeUrl = ref("");
const qrCodeId = ref("");

let checkTimer: null | number = null;

// 监听visible属性变化
watch(
	() => props.visible,
	(newVal) => {
		dialogVisible.value = newVal;
		if (newVal) {
			generateQrCode();
		}
	},
);

// 监听对话框关闭
watch(dialogVisible, (newVal) => {
	emit("update:visible", newVal);
	if (!newVal) {
		handleClose();
	}
});

// 生成二维码
const generateQrCode = async () => {
	try {
		isScanned.value = false;
		isExpired.value = false;

		const res = await getLoginQrCode();
		if (res.data.code === 200) {
			const { qrCodeUrl: url, qrCodeId: id, expireTime } = res.data.data;
			qrCodeUrl.value = url;
			qrCodeId.value = id;

			// 启动状态检查
			startStatusCheck();

			// 设置二维码过期时间
			const timeout = expireTime - Date.now();
			setTimeout(() => {
				if (!isScanned.value) {
					isExpired.value = true;
					stopStatusCheck();
				}
			}, timeout);
		} else {
			ElMessage.error(res.data.message || "获取二维码失败");
		}
	} catch (error) {
		console.error("获取二维码错误:", error);
		ElMessage.error("获取二维码失败");
	}
};

// 刷新二维码
const refreshQrCode = () => {
	generateQrCode();
};

// 开始检查扫码状态
const startStatusCheck = () => {
	checkTimer = setInterval(async () => {
		try {
			const res = await checkScanStatus(qrCodeId.value);
			if (res.data.code === 200) {
				const { status } = res.data.data;
				switch (status) {
					case "SCANNED":
						isScanned.value = true;
						break;
					case "CONFIRMED":
						await handleLoginSuccess();
						break;
					case "EXPIRED":
						isExpired.value = true;
						stopStatusCheck();
						break;
					case "CANCELED":
						ElMessage.info("用户取消登录");
						dialogVisible.value = false;
						break;
				}
			}
		} catch (error) {
			console.error("检查扫码状态错误:", error);
		}
	}, 2000);
};

// 停止状态检查
const stopStatusCheck = () => {
	if (checkTimer) {
		clearInterval(checkTimer);
		checkTimer = null;
	}
};

// 处理登录成功
const handleLoginSuccess = async () => {
	try {
		// 更新用户状态
		await userStore.wechatLogin(qrCodeId.value);
		ElMessage.success("登录成功");
		emit("login-success");
		dialogVisible.value = false;
	} catch (error) {
		console.error("处理登录成功状态错误:", error);
		ElMessage.error("登录失败");
	}
};

// 处理对话框关闭
const handleClose = () => {
	stopStatusCheck();
	isScanned.value = false;
	isExpired.value = false;
};

// 组件卸载时清理定时器
onUnmounted(() => {
	stopStatusCheck();
});
</script>

<style lang="scss" scoped>
.qrcode-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 0;
}

.qrcode {
	text-align: center;

	img {
		width: 200px;
		height: 200px;
		margin-bottom: 16px;
	}
}

.scanned {
	text-align: center;
	padding: 40px 0;
}

.success-icon {
	font-size: 60px;
	margin-bottom: 16px;
}

.tip {
	color: #333;
	font-size: 16px;
	margin: 8px 0;
}

.sub-tip {
	color: #666;
	font-size: 14px;
}

.refresh {
	text-align: center;
	padding: 20px 0;

	.expired-tip {
		color: #f56c6c;
		margin-bottom: 16px;
	}
}
</style>
