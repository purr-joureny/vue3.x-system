<script setup lang="ts">
import { ref } from "vue";

const users = ref([
	{
		id: 1,
		username: "user1",
		nickname: "用户1",
		email: "user1@example.com",
		createTime: "2025-01-23",
		status: "active",
	},
	// 更多用户数据...
]);

const handleStatusChange = (row: any) => {
	console.log("修改用户状态:", row);
};
</script>

<template>
	<div class="users-container">
		<div class="page-header">
			<h2>用户管理</h2>
			<el-button type="primary">添加用户</el-button>
		</div>

		<el-table :data="users" style="width: 100%">
			<el-table-column prop="id" label="ID" width="80" />
			<el-table-column prop="username" label="用户名" width="120" />
			<el-table-column prop="nickname" label="昵称" width="120" />
			<el-table-column prop="email" label="邮箱" />
			<el-table-column prop="createTime" label="注册时间" width="180" />
			<el-table-column prop="status" label="状态" width="120">
				<template #default="{ row }">
					<el-switch
						v-model="row.status"
						active-value="active"
						inactive-value="inactive"
						@change="handleStatusChange(row)"
					/>
				</template>
			</el-table-column>
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
.users-container {
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
]]>
