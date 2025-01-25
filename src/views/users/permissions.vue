<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox, ElTreeSelect } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

interface Role {
	id: number;
	name: string;
	description: string;
	permissions: string[];
	createTime: string;
}

interface RoleForm {
	name: string;
	description: string;
	permissions: string[];
}

// 角色列表数据
const roleList = ref<Role[]>([
	{
		id: 1,
		name: "超级管理员",
		description: "系统最高权限",
		permissions: ["all"],
		createTime: "2024-01-24 12:00:00",
	},
	{
		id: 2,
		name: "内容管理员",
		description: "管理视频内容",
		permissions: ["video:view", "video:edit", "video:delete"],
		createTime: "2024-01-24 12:00:00",
	},
	{
		id: 3,
		name: "用户管理员",
		description: "管理用户信息",
		permissions: ["user:view", "user:edit"],
		createTime: "2024-01-24 12:00:00",
	},
]);

// 权限选项
const permissionOptions = [
	{
		label: "视频管理",
		options: [
			{ label: "查看视频", value: "video:view" },
			{ label: "编辑视频", value: "video:edit" },
			{ label: "删除视频", value: "video:delete" },
			{ label: "上传视频", value: "video:upload" },
		],
	},
	{
		label: "用户管理",
		options: [
			{ label: "查看用户", value: "user:view" },
			{ label: "编辑用户", value: "user:edit" },
			{ label: "删除用户", value: "user:delete" },
		],
	},
	{
		label: "系统管理",
		options: [
			{ label: "查看设置", value: "setting:view" },
			{ label: "修改设置", value: "setting:edit" },
		],
	},
];

// 表单相关
const dialogVisible = ref(false);
const formRef = ref<FormInstance>();
const roleForm = reactive<RoleForm>({
	name: "",
	description: "",
	permissions: [],
});

const rules = reactive<FormRules>({
	name: [
		{ required: true, message: "请输入角色名称", trigger: "blur" },
		{ min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
	],
	description: [
		{ required: true, message: "请输入角色描述", trigger: "blur" },
		{ max: 100, message: "长度不能超过100个字符", trigger: "blur" },
	],
	permissions: [
		{ required: true, message: "请选择权限", trigger: "change" },
		{ type: "array", min: 1, message: "请至少选择一个权限", trigger: "change" },
	],
});

// 打开新增角色对话框
const openAddDialog = () => {
	dialogVisible.value = true;
	roleForm.name = "";
	roleForm.description = "";
	roleForm.permissions = [];
};

// 提交表单
const handleSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;

	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log("提交角色:", roleForm);
			// TODO: 调用API保存角色
			dialogVisible.value = false;
			ElMessage({
				type: "success",
				message: "保存成功",
			});
		} else {
			console.error("表单验证失败:", fields);
		}
	});
};

// 编辑角色
const handleEdit = (row: Role) => {
	dialogVisible.value = true;
	roleForm.name = row.name;
	roleForm.description = row.description;
	roleForm.permissions = [...row.permissions];
};

// 删除角色
const handleDelete = (row: Role) => {
	ElMessageBox.confirm(`确认删除角色 "${row.name}" 吗？`, "警告", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
	})
		.then(() => {
			console.log("删除角色:", row);
			// TODO: 调用API删除角色
			ElMessage({
				type: "success",
				message: "删除成功",
			});
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "已取消删除",
			});
		});
};
</script>

<template>
	<div class="permissions-container">
		<el-card class="permissions-card">
			<template #header>
				<div class="card-header">
					<span>角色权限管理</span>
					<el-button type="primary" @click="openAddDialog">新增角色</el-button>
				</div>
			</template>

			<el-table :data="roleList" style="width: 100%" border>
				<el-table-column prop="id" label="ID" width="80" />
				<el-table-column prop="name" label="角色名称" width="150" />
				<el-table-column prop="description" label="描述" />
				<el-table-column label="权限" min-width="200">
					<template #default="{ row }">
						<el-space wrap>
							<el-tag
								v-for="permission in row.permissions"
								:key="permission"
								type="info"
								effect="plain"
							>
								{{ permission }}
							</el-tag>
						</el-space>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="180" />
				<el-table-column label="操作" width="150" fixed="right">
					<template #default="{ row }">
						<el-button link type="primary" @click="handleEdit(row)">
							编辑
						</el-button>
						<el-button link type="danger" @click="handleDelete(row)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>

		<!-- 新增/编辑角色对话框 -->
		<el-dialog
			v-model="dialogVisible"
			:title="roleForm.name ? '编辑角色' : '新增角色'"
			width="600px"
			destroy-on-close
		>
			<el-form
				ref="formRef"
				:model="roleForm"
				:rules="rules"
				label-width="100px"
			>
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="roleForm.name" placeholder="请输入角色名称" />
				</el-form-item>

				<el-form-item label="角色描述" prop="description">
					<el-input
						v-model="roleForm.description"
						type="textarea"
						placeholder="请输入角色描述"
					/>
				</el-form-item>

				<el-form-item label="角色权限" prop="permissions">
					<el-tree-select
						v-model="roleForm.permissions"
						:data="permissionOptions"
						show-checkbox
						multiple
						:render-after-expand="false"
						placeholder="请选择权限"
					/>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleSubmit(formRef)">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style lang="scss" scoped>
.permissions-container {
	padding: 20px;

	.permissions-card {
		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			span {
				font-size: 16px;
				font-weight: 600;
			}
		}
	}

	:deep(.el-tree-select) {
		width: 100%;
	}
}
</style>
