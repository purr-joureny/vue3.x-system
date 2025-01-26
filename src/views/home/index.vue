<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "@/store/modules/user";
import {
	Sunny,
	Upload,
	DataLine,
	VideoCamera,
	View,
	User,
	Timer,
	CaretTop,
	CaretBottom,
	UserFilled,
	Document,
	Setting,
} from "@element-plus/icons-vue";
import * as echarts from "echarts";
import { useEventListener } from "@vueuse/core";

const userStore = useUserStore();
const timeRange = ref("week");
const trendChartRef = ref<HTMLElement | null>(null);
const pieChartRef = ref<HTMLElement | null>(null);
let trendChart: echarts.ECharts | null = null;
let pieChart: echarts.ECharts | null = null;

// 模拟数据
const statistics = ref({
	totalVideos: 1234,
	videoGrowth: 15,
	totalViews: 1234567,
	viewGrowth: 25,
	activeUsers: 45678,
	userGrowth: 18,
	avgWatchTime: 35,
	timeGrowth: 5,
});

const formatNumber = (num: number): string => {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + "K";
	}
	return num.toString();
};

const initTrendChart = () => {
	if (!trendChartRef.value) return;

	trendChart = echarts.init(trendChartRef.value);
	const option = {
		tooltip: {
			trigger: "axis",
		},
		legend: {
			data: ["视频数", "播放量", "活跃用户"],
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "视频数",
				type: "line",
				smooth: true,
				data: [120, 132, 101, 134, 90, 230, 210],
			},
			{
				name: "播放量",
				type: "line",
				smooth: true,
				data: [220, 182, 191, 234, 290, 330, 310],
			},
			{
				name: "活跃用户",
				type: "line",
				smooth: true,
				data: [150, 232, 201, 154, 190, 330, 410],
			},
		],
	};

	trendChart.setOption(option);
};

const initPieChart = () => {
	if (!pieChartRef.value) return;

	pieChart = echarts.init(pieChartRef.value);
	const option = {
		tooltip: {
			trigger: "item",
		},
		legend: {
			orient: "vertical",
			left: "left",
		},
		series: [
			{
				name: "用户分布",
				type: "pie",
				radius: "50%",
				data: [
					{ value: 1048, name: "普通用户" },
					{ value: 735, name: "会员用户" },
					{ value: 580, name: "企业用户" },
					{ value: 484, name: "游客" },
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				},
			},
		],
	};

	pieChart.setOption(option);
};

// 监听窗口大小变化，重绘图表
useEventListener("resize", () => {
	trendChart?.resize();
	pieChart?.resize();
});

// 监听时间范围变化，更新趋势图数据
watch(timeRange, (newValue) => {
	// TODO: 根据时间范围获取新数据
	console.log("Time range changed:", newValue);
});

onMounted(() => {
	initTrendChart();
	initPieChart();
});

// 处理按钮点击事件
const handleUpload = () => {
	// TODO: 实现上传功能
};

const handleViewData = () => {
	// TODO: 实现数据查看功能
};

const handleUserManagement = () => {
	// TODO: 跳转到用户管理页面
};

const handleContentManagement = () => {
	// TODO: 跳转到内容管理页面
};

const handleSystemSettings = () => {
	// TODO: 跳转到系统设置页面
};
</script>

<template>
	<div class="home-container">
		<div class="welcome-section">
			<div class="welcome-content">
				<h1 class="welcome-title">
					欢迎回来，{{ userStore.userInfo?.username }}
					<el-icon class="welcome-icon"><Sunny /></el-icon>
				</h1>
				<p class="welcome-subtitle">今天是个适合工作的好日子</p>
			</div>
			<div class="quick-actions">
				<el-button type="primary" class="action-button" @click="handleUpload">
					<el-icon><Upload /></el-icon>上传视频
				</el-button>
				<el-button type="success" class="action-button" @click="handleViewData">
					<el-icon><DataLine /></el-icon>查看数据
				</el-button>
			</div>
		</div>

		<div class="stats-section">
			<el-row :gutter="20">
				<el-col :xs="24" :sm="12" :md="6">
					<div class="stats-card">
						<div class="stats-icon">
							<el-icon><VideoCamera /></el-icon>
						</div>
						<div class="stats-info">
							<div class="stats-label">视频总数</div>
							<div class="stats-value">
								{{ formatNumber(statistics.totalVideos) }}
							</div>
							<div class="stats-trend up">
								<el-icon><CaretTop /></el-icon>
								+{{ statistics.videoGrowth }}%
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="6">
					<div class="stats-card">
						<div class="stats-icon">
							<el-icon><View /></el-icon>
						</div>
						<div class="stats-info">
							<div class="stats-label">总播放量</div>
							<div class="stats-value">
								{{ formatNumber(statistics.totalViews) }}
							</div>
							<div class="stats-trend up">
								<el-icon><CaretTop /></el-icon>
								+{{ statistics.viewGrowth }}%
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="6">
					<div class="stats-card">
						<div class="stats-icon">
							<el-icon><User /></el-icon>
						</div>
						<div class="stats-info">
							<div class="stats-label">活跃用户</div>
							<div class="stats-value">
								{{ formatNumber(statistics.activeUsers) }}
							</div>
							<div class="stats-trend up">
								<el-icon><CaretTop /></el-icon>
								+{{ statistics.userGrowth }}%
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="6">
					<div class="stats-card">
						<div class="stats-icon">
							<el-icon><Timer /></el-icon>
						</div>
						<div class="stats-info">
							<div class="stats-label">平均观看时长</div>
							<div class="stats-value">{{ statistics.avgWatchTime }}分钟</div>
							<div class="stats-trend down">
								<el-icon><CaretBottom /></el-icon>
								-{{ statistics.timeGrowth }}%
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>

		<div class="charts-section">
			<el-row :gutter="20">
				<el-col :xs="24" :lg="16">
					<div class="chart-card">
						<div class="chart-header">
							<h3>数据趋势</h3>
							<el-radio-group v-model="timeRange" size="small">
								<el-radio-button label="week">周</el-radio-button>
								<el-radio-button label="month">月</el-radio-button>
								<el-radio-button label="year">年</el-radio-button>
							</el-radio-group>
						</div>
						<div ref="trendChartRef" class="chart-container"></div>
					</div>
				</el-col>
				<el-col :xs="24" :lg="8">
					<div class="chart-card">
						<div class="chart-header">
							<h3>用户分布</h3>
						</div>
						<div ref="pieChartRef" class="chart-container"></div>
					</div>
				</el-col>
			</el-row>
		</div>

		<div class="quick-access">
			<el-row :gutter="20">
				<el-col :xs="24" :sm="8">
					<div class="quick-card" @click="handleUserManagement">
						<el-icon><UserFilled /></el-icon>
						<h3>用户管理</h3>
						<p>管理系统用户权限</p>
					</div>
				</el-col>
				<el-col :xs="24" :sm="8">
					<div class="quick-card" @click="handleContentManagement">
						<el-icon><Document /></el-icon>
						<h3>内容管理</h3>
						<p>管理视频和文章内容</p>
					</div>
				</el-col>
				<el-col :xs="24" :sm="8">
					<div class="quick-card" @click="handleSystemSettings">
						<el-icon><Setting /></el-icon>
						<h3>系统设置</h3>
						<p>配置系统参数</p>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style scoped>
@import "@/styles/home.css";
</style>
