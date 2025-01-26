<script setup lang="ts">
import { ref } from "vue";

const videos = ref([
	{
		id: 1,
		title: "示例视频 1",
		cover: "https://placeholder.co/300x200",
		views: 1234,
		likes: 99,
		createTime: "2025-01-23",
	},
	// 更多视频数据...
]);
</script>

<template>
	<div class="videos-container">
		<div class="page-header">
			<h2>视频列表</h2>
			<el-button type="primary" @click="$router.push('/videos/upload')">
				上传视频
			</el-button>
		</div>

		<el-table :data="videos" style="width: 100%">
			<el-table-column label="封面" width="180">
				<template #default="{ row }">
					<el-image
						style="width: 160px; height: 90px"
						:src="row.cover"
						fit="cover"
					/>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" />
			<el-table-column prop="views" label="播放量" width="120" />
			<el-table-column prop="likes" label="点赞数" width="120" />
			<el-table-column prop="createTime" label="上传时间" width="180" />
			<el-table-column label="操作" width="200">
				<template #default="{ row }">
					<el-button link type="primary">编辑</el-button>
					<el-button link type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style scoped lang="scss">
.videos-container {
	padding: 20px;
}

.page-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
}

.page-header h2 {
	margin: 0;
	font-size: 24px;
	color: #303133;
}
</style>
