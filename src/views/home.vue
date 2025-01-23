<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/modules/user";
import { StarFilled, VideoCamera, View, ChatDotRound } from '@element-plus/icons-vue'

const userStore = useUserStore();
const username = userStore.userInfo?.nickname || userStore.userInfo?.username;

const statistics = ref({
  totalVideos: 156,
  totalViews: 1234567,
  totalLikes: 45678,
  totalComments: 9876,
});
</script>

<template>
  <div class="home-container">
    <div class="welcome-section">
      <h2>欢迎回来，{{ username }}！</h2>
      <p>今天是个适合创作的好日子</p>
    </div>

    <el-row :gutter="20" class="statistics-cards">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="statistics-item">
            <div class="icon-wrapper purple">
              <el-icon><VideoCamera /></el-icon>
            </div>
            <div class="content">
              <div class="value">{{ statistics.totalVideos }}</div>
              <div class="label">视频总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="statistics-item">
            <div class="icon-wrapper blue">
              <el-icon><View /></el-icon>
            </div>
            <div class="content">
              <div class="value">{{ statistics.totalViews }}</div>
              <div class="label">总播放量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="statistics-item">
            <div class="icon-wrapper green">
              <el-icon><StarFilled /></el-icon>
            </div>
            <div class="content">
              <div class="value">{{ statistics.totalLikes }}</div>
              <div class="label">获赞数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="statistics-item">
            <div class="icon-wrapper orange">
              <el-icon><ChatDotRound /></el-icon>
            </div>
            <div class="content">
              <div class="value">{{ statistics.totalComments }}</div>
              <div class="label">评论数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-4">
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最近数据趋势</span>
            </div>
          </template>
          <div class="chart-placeholder">图表区域（后续可添加 ECharts）</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
            </div>
          </template>
          <el-empty description="暂无待办事项" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.home-container {
  padding: 20px;
}

.welcome-section {
  margin-bottom: 24px;
}

.welcome-section h2 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.welcome-section p {
  margin: 8px 0 0;
  color: #909399;
}

.statistics-cards {
  margin-bottom: 24px;
}

.statistics-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper :deep(.el-icon) {
  font-size: 24px;
  color: #fff;
}

.purple {
  background-color: #8e44ad;
}

.blue {
  background-color: #3498db;
}

.green {
  background-color: #2ecc71;
}

.orange {
  background-color: #e67e22;
}

.content .value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  line-height: 1;
  margin-bottom: 8px;
}

.content .label {
  font-size: 14px;
  color: #909399;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  color: #909399;
  border-radius: 4px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
