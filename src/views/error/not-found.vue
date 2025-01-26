<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
	router.push("/");
};
</script>

<template>
	<div class="not-found">
		<el-result icon="warning" title="404" sub-title="抱歉，您访问的页面不存在">
			<template #extra>
				<el-button type="primary" @click="goHome">返回首页</el-button>
			</template>
		</el-result>
	</div>
</template>

<style scoped lang="scss">
.not-found {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5f7fa;

	:deep(.el-result__icon) {
		svg {
			width: 84px;
			height: 84px;
		}
	}

	:deep(.el-result__title) {
		font-size: 48px;
		margin-top: 20px;
	}

	:deep(.el-result__subtitle) {
		font-size: 20px;
		margin-top: 10px;
	}
}
</style>
