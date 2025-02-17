<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useLayoutStore } from "@/store/modules/layout";
import { useMenuStore } from "@/store/modules/menu";
import { useRoute } from "vue-router";
import {
	HomeFilled,
	VideoCamera,
	Platform,
	UserFilled,
	Setting,
} from "@element-plus/icons-vue";

// 图标映射
const iconMap: Record<string, any> = {
	HomeFilled,
	Platform,
	VideoCamera,
	UserFilled,
	Setting,
};

const userStore = useUserStore();
const layoutStore = useLayoutStore();
const menuStore = useMenuStore();
const route = useRoute();

// 获取菜单数据
onMounted(async () => {
	if (userStore.userInfo?.id) {
		await menuStore.fetchUserMenus(String(userStore.userInfo.id));
	} else {
		await menuStore.fetchMenus();
	}
});

// 计算当前激活的菜单项
const activeMenu = computed(() => {
	const { path } = route;
	const matchedRoute = route.matched[route.matched.length - 1];
	if (matchedRoute && matchedRoute.meta.activeMenu) {
		return matchedRoute.meta.activeMenu;
	}
	return path;
});

// 计算默认展开的子菜单
const defaultOpeneds = computed(() => {
	const { path } = route;
	const openedMenus: string[] = [];

	const findParentMenus = (menus: any[], targetPath: string) => {
		for (const menu of menus) {
			if (menu.children) {
				if (menu.children.some((child: any) => child.path === targetPath)) {
					openedMenus.push(menu.index);
				}
				findParentMenus(menu.children, targetPath);
			}
		}
	};

	findParentMenus(menuStore.menus, path);
	return openedMenus;
});
</script>

<template>
	<el-aside :width="layoutStore.isCollapse ? '64px' : '200px'" class="aside">
		<div class="logo">
			<el-icon size="24" color="#ffffff"><Platform /></el-icon>
			<span class="logo-text" v-if="!layoutStore.isCollapse">后台管理</span>
		</div>
		<div class="menu-container">
			<el-scrollbar>
				<el-menu
					:default-active="activeMenu"
					:default-openeds="defaultOpeneds"
					class="menu"
					:collapse="layoutStore.isCollapse"
					background-color="#1f2937"
					text-color="#94a3b8"
					active-text-color="#ffffff"
					:collapse-transition="false"
					unique-opened
					router
				>
					<template v-for="item in menuStore.menus" :key="item.index">
						<el-sub-menu v-if="item.children?.length" :index="item.index">
							<template #title>
								<el-icon><component :is="iconMap[item.icon!]" /></el-icon>
								<span>{{ item.title }}</span>
							</template>
							<el-menu-item
								v-for="child in item.children"
								:key="child.index"
								:index="child.path"
							>
								{{ child.title }}
							</el-menu-item>
						</el-sub-menu>

						<el-menu-item v-else :index="item.path">
							<el-icon><component :is="iconMap[item.icon!]" /></el-icon>
							<template #title>{{ item.title }}</template>
						</el-menu-item>
					</template>
				</el-menu>
			</el-scrollbar>
		</div>
	</el-aside>
</template>

<style lang="scss" scoped>
.aside {
	height: calc(100vh);
	//   height: calc(100vh - 32px);
	//   margin: 16px 0 16px 16px;
	//   border-radius: 16px;
	background-color: #001529;
	transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
	overflow: hidden;
	position: relative;
	z-index: 1000;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), transparent);
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	&:hover {
		box-shadow: 4px 0 16px rgba(0, 0, 0, 0.25);

		&::before {
			opacity: 1;
		}
	}
}

.logo {
	height: 56px;
	display: flex;
	align-items: center;
	padding: 0 16px;
	overflow: hidden;
	background: linear-gradient(to right, #001529, #002140);
	border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	position: relative;
	border-radius: 16px 16px 0 0;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.1),
			transparent
		);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	&:hover {
		background: linear-gradient(to right, #002140, #003366);
		padding-left: 20px;

		&::after {
			transform: translateX(100%);
		}

		.el-icon {
			transform: rotate(360deg) scale(1.2);
			filter: drop-shadow(0 0 8px var(--el-color-primary));
		}

		.logo-text {
			transform: translateX(4px) scale(1.05);
			text-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
			letter-spacing: 1px;
		}
	}

	.el-icon {
		min-width: 24px;
		font-size: 24px;
		color: var(--el-color-primary);
		transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
		transform-origin: center;
		filter: drop-shadow(0 0 2px var(--el-color-primary));
	}

	.logo-text {
		margin-left: 12px;
		color: #fff;
		font-size: 16px;
		font-weight: 500;
		white-space: nowrap;
		opacity: 1;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		transform-origin: left;
	}
}

.menu-container {
	height: calc(100vh - 56px - 32px);
}

:deep(.el-menu) {
	border: none;
	background: transparent;
	transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

	.el-menu-item,
	.el-sub-menu__title {
		border-radius: 12px;
		// margin: 4px 8px;
		height: 48px;
		line-height: 48px;
		color: rgba(255, 255, 255, 0.65);
		background: transparent;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;

		&::before {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), transparent);
			transform: translateX(-100%) skewX(-15deg);
			transition: transform 0.4s ease;
		}

		&:hover {
			color: #fff;
			padding-left: 28px;
			background: rgba(255, 255, 255, 0.05);
			transform: translateX(4px);

			&::before {
				transform: translateX(100%) skewX(-15deg);
			}

			.el-icon {
				transform: scale(1.2) rotate(20deg);
				filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
			}
		}

		.el-icon {
			color: inherit;
			font-size: 18px;
			transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
			transform-origin: center;
			margin-right: 12px;
		}
	}

	.el-menu-item {
		&.is-active {
			color: #fff;
			background: var(--el-color-primary);
			transform-origin: left;
			animation: menuItemActive 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

			&::before {
				background: linear-gradient(
					90deg,
					rgba(255, 255, 255, 0.2),
					transparent
				);
			}

			&::after {
				content: "";
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				width: 3px;
				// background: #fff;
				transform-origin: top;
				animation: borderSlide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
				box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
			}

			.el-icon {
				color: #fff;
				animation: iconRotate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
				filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
			}
		}
	}

	.el-sub-menu {
		&.is-active {
			> .el-sub-menu__title {
				color: #fff;
				animation: subMenuTitleActive 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
			}
		}

		.el-menu {
			background: rgba(0, 0, 0, 0.2);
			transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

			.el-menu-item {
				background: transparent;
				padding-left: 48px !important;
				min-width: auto;
				transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
				border-radius: 12px;
				// margin: 4px 8px;

				&:hover {
					color: #fff;
					background: rgba(255, 255, 255, 0.05);
					transform: translateX(8px);
					padding-left: 54px !important;
				}

				&.is-active {
					background: var(--el-color-primary);
					transform: translateX(0);
				}
			}
		}
	}
}

:deep(.el-menu--collapse) {
	width: 64px;

	.el-sub-menu {
		&.is-active {
			> .el-sub-menu__title {
				color: #fff;
				animation: subMenuTitleActive 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
			}
		}
	}

	.el-menu-item {
		.el-tooltip {
			padding: 0 !important;
			text-align: center;
			border-radius: 12px;

			.el-icon {
				margin: 0;
				font-size: 20px;
				transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

				&:hover {
					transform: scale(1.3) rotate(20deg);
					filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
				}
			}
		}
	}
}

:deep(.el-scrollbar) {
	height: 100%;

	.el-scrollbar__wrap {
		overflow-x: hidden;
	}

	.el-scrollbar__bar {
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

		&.is-horizontal {
			display: none;
		}

		&.is-vertical {
			> div {
				background: rgba(255, 255, 255, 0.2);
				width: 4px;
				transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
				border-radius: 4px;

				&:hover {
					background: rgba(255, 255, 255, 0.4);
					width: 6px;
				}
			}
		}
	}
}

@keyframes menuItemActive {
	0% {
		transform: translateX(-20px);
		opacity: 0;
	}
	50% {
		transform: translateX(5px);
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
}

@keyframes borderSlide {
	0% {
		transform: scaleY(0);
		opacity: 0;
	}
	100% {
		transform: scaleY(1);
		opacity: 1;
	}
}

@keyframes iconRotate {
	0% {
		transform: rotate(0) scale(1);
	}
	50% {
		transform: rotate(180deg) scale(1.3);
	}
	100% {
		transform: rotate(360deg) scale(1);
	}
}

@keyframes subMenuTitleActive {
	0% {
		transform: translateY(-10px);
		opacity: 0;
	}
	50% {
		transform: translateY(5px);
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}

@media (max-width: 768px) {
	.aside {
		margin: 0;
		height: 100vh;
		border-radius: 0;
	}
}
</style>
