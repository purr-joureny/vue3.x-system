<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useLayoutStore } from "@/store/modules/layout";
import { useRouter, useRoute } from "vue-router";
import { Fold, Expand, ArrowDown } from "@element-plus/icons-vue";

const userStore = useUserStore();
const layoutStore = useLayoutStore();
const router = useRouter();
const route = useRoute();

// 计算面包屑
const breadcrumbs = computed(() => {
	const currentRoute = route;
	const items = [{ title: "首页", path: "/home" }];

	if (currentRoute.meta?.title) {
		items.push({
			title: currentRoute.meta.title as string,
			path: currentRoute.path,
		});
	}

	return items;
});

const breadcrumbItems = computed(() => {
	return breadcrumbs.value.map((item) => item.title);
});

const handleLogout = async () => {
	await userStore.logout();
	router.push("/login");
};

const toggleCollapse = () => {
	layoutStore.setCollapse(!layoutStore.isCollapse);
};

const handleCommand = (command: string) => {
	if (command === "logout") {
		handleLogout();
	}
};
</script>

<template>
	<el-header class="header">
		<div class="left">
			<el-icon class="collapse-btn" @click="toggleCollapse">
				<component :is="layoutStore.isCollapse ? Expand : Fold" />
			</el-icon>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item v-for="item in breadcrumbItems" :key="item">
					{{ item }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="right">
			<el-dropdown @command="handleCommand">
				<span class="user-dropdown">
					<el-avatar :size="32" :src="userStore.userInfo?.avatar">
						{{
							userStore.userInfo?.nickname?.[0] ||
							userStore.userInfo?.username?.[0]
						}}
					</el-avatar>
					<span class="username">{{
						userStore.userInfo?.nickname || userStore.userInfo?.username
					}}</span>
					<el-icon><ArrowDown /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</el-header>
</template>

<style lang="scss" scoped>
.header {
	//   border-radius: 0 0 16px 16px;
	//   margin: 0 16px 16px;
	background-color: #ffffff;
	border: 1px solid #f0f0f0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 56px;
	padding: 0 20px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
	transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	position: relative;
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(
			90deg,
			var(--el-color-primary),
			var(--el-color-success)
		);
		transform: translateY(-100%);
		transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	&:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transform: translateY(-1px);

		&::before {
			transform: translateY(0);
		}
	}

	.left {
		display: flex;
		align-items: center;
		gap: 16px;

		.collapse-btn {
			border-radius: 12px;
			cursor: pointer;
			font-size: 18px;
			width: 36px;
			height: 36px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			color: #666;
			transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
			transform-origin: center;
			position: relative;
			overflow: hidden;

			&::before {
				content: "";
				position: absolute;
				top: 50%;
				left: 50%;
				width: 0;
				height: 0;
				background: var(--el-color-primary-light-9);
				border-radius: 50%;
				transform: translate(-50%, -50%);
				transition:
					width 0.4s ease-out,
					height 0.4s ease-out;
				z-index: -1;
			}

			&:hover {
				color: var(--el-color-primary);
				transform: rotate(180deg) scale(1.1);

				&::before {
					width: 200%;
					height: 200%;
				}
			}

			&:active {
				transform: rotate(180deg) scale(0.9);
			}
		}

		:deep(.el-breadcrumb) {
			.el-breadcrumb__item {
				.el-breadcrumb__inner {
					color: #666;
					font-weight: normal;
					font-size: 14px;
					position: relative;
					transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

					&.is-link {
						color: #666;
						&:hover {
							color: var(--el-color-primary);
							transform: translateY(-2px);
							text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
						}

						&::after {
							content: "";
							position: absolute;
							bottom: -2px;
							left: 0;
							width: 100%;
							height: 2px;
							background: linear-gradient(
								90deg,
								var(--el-color-primary),
								var(--el-color-success)
							);
							transform: scaleX(0);
							transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
							transform-origin: right;
						}

						&:hover::after {
							transform: scaleX(1);
							transform-origin: left;
						}
					}
				}

				&:last-child {
					.el-breadcrumb__inner {
						color: #333;
						font-weight: 500;
					}
				}

				.el-breadcrumb__separator {
					color: #999;
					transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
				}

				&:hover {
					.el-breadcrumb__separator {
						transform: scale(1.4) rotate(360deg);
					}
				}
			}
		}
	}

	.right {
		display: flex;
		align-items: center;

		.user-dropdown {
			border-radius: 16px;
			display: flex;
			align-items: center;
			padding: 6px 12px;
			cursor: pointer;
			transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
			background: transparent;
			position: relative;
			overflow: hidden;

			&::before {
				content: "";
				position: absolute;
				top: 50%;
				left: 50%;
				width: 0;
				height: 0;
				background: #f5f5f5;
				border-radius: 50%;
				transform: translate(-50%, -50%);
				transition:
					width 0.4s ease-out,
					height 0.4s ease-out;
				z-index: -1;
			}

			&:hover {
				transform: translateY(-2px);
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

				&::before {
					width: 300%;
					height: 300%;
				}

				.el-avatar {
					transform: rotate(360deg) scale(1.1);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
				}

				.username {
					color: var(--el-color-primary);
					transform: translateX(4px);
				}

				.el-icon {
					transform: rotate(180deg) scale(1.2);
					color: var(--el-color-primary);
				}
			}

			&:active {
				transform: translateY(-1px);
			}

			.el-avatar {
				border: 2px solid #fff;
				background: var(--el-color-primary);
				transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
			}

			.username {
				margin: 0 10px;
				font-size: 14px;
				color: #333;
				font-weight: 500;
				transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
			}

			.el-icon {
				font-size: 12px;
				color: #999;
				transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
			}
		}
	}
}

:deep(.el-dropdown-menu) {
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
	padding: 6px;
	transform-origin: top;
	animation: dropdownIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

	.el-dropdown-menu__item {
		border-radius: 12px;
		padding: 10px 20px;
		margin: 2px 0;
		font-size: 14px;
		color: #333;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;

		&::before {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			width: 0;
			height: 0;
			background: var(--el-color-danger-light-9);
			border-radius: 50%;
			transform: translate(-50%, -50%);
			transition:
				width 0.4s ease-out,
				height 0.4s ease-out;
			z-index: -1;
		}

		&:hover {
			color: var(--el-color-danger);
			padding-left: 28px;
			transform: scale(1.05);

			&::before {
				width: 300%;
				height: 300%;
			}
		}

		&:active {
			transform: scale(0.95);
		}
	}
}

@keyframes dropdownIn {
	from {
		opacity: 0;
		transform: translateY(-20px) scale(0.9);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

@media (max-width: 768px) {
	.header {
		padding: 0 12px;
	}

	.username {
		display: none;
	}
}
</style>
