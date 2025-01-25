<script setup lang="ts">
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';

const uploadForm = ref({
	title: '',
	description: '',
	cover: '',
	videoFile: null as File | null
});

const handleUpload = () => {
	// 实现视频上传逻辑
	console.log('上传视频:', uploadForm.value);
};
</script>

<template>
	<div class="upload-container">
		<div class="page-header">
			<h2>上传视频</h2>
		</div>

		<el-form :model="uploadForm" label-width="120px">
			<el-form-item label="视频标题" required>
				<el-input v-model="uploadForm.title" placeholder="请输入视频标题" />
			</el-form-item>

			<el-form-item label="视频描述">
				<el-input
					v-model="uploadForm.description"
					type="textarea"
					:rows="4"
					placeholder="请输入视频描述"
				/>
			</el-form-item>

			<el-form-item label="视频封面">
				<el-upload
					class="cover-uploader"
					action="#"
					:auto-upload="false"
					:show-file-list="false"
				>
					<el-image
						v-if="uploadForm.cover"
						:src="uploadForm.cover"
						class="cover-preview"
					/>
					<el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
				</el-upload>
			</el-form-item>

			<el-form-item label="视频文件" required>
				<el-upload
					class="video-uploader"
					action="#"
					:auto-upload="false"
					:show-file-list="false"
				>
					<el-button type="primary">选择视频文件</el-button>
					<template #tip>
						<div class="el-upload__tip">
							支持 mp4、mov 格式视频，文件大小不超过 500MB
						</div>
					</template>
				</el-upload>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="handleUpload">开始上传</el-button>
				<el-button @click="$router.back()">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped lang="scss">
.upload-container {
	padding: 20px;
	max-width: 800px;
}

.page-header {
	margin-bottom: 24px;
}

.page-header h2 {
	margin: 0;
	font-size: 24px;
	color: #303133;
}

.cover-uploader {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	width: 178px;
	height: 100px;
}

.cover-uploader:hover {
	border-color: #409eff;
}

.cover-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 100px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}

.cover-preview {
	width: 178px;
	height: 100px;
	display: block;
}
</style>
