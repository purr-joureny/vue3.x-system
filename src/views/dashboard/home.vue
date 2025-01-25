<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/modules/user";
import {
  StarFilled,
  VideoCamera,
  View,
  ChatDotRound,
} from "@element-plus/icons-vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {
  LineChart,
  BarChart,
  PieChart
} from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import type { ECOption } from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
]);

const userStore = useUserStore();
const username = userStore.userInfo?.nickname || userStore.userInfo?.username;

const statistics = ref({
  totalVideos: 156,
  totalViews: 1234567,
  totalLikes: 45678,
  totalComments: 9876,
});

// 趋势图表配置
const trendChartOption = ref<ECOption>({
  title: {
    text: '近7天数据趋势',
    left: 'center',
    top: 0,
    textStyle: {
      color: '#1a1a1a',
      fontSize: 16,
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    bottom: '0',
    data: ['播放量', '点赞数', '评论数']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: {
      lineStyle: {
        color: '#ddd'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#f0f0f0'
      }
    }
  },
  series: [
    {
      name: '播放量',
      type: 'line',
      smooth: true,
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      itemStyle: {
        color: '#3b82f6'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(59,130,246,0.2)'
          }, {
            offset: 1,
            color: 'rgba(59,130,246,0.01)'
          }]
        }
      }
    },
    {
      name: '点赞数',
      type: 'line',
      smooth: true,
      data: [320, 332, 301, 334, 390, 330, 320],
      itemStyle: {
        color: '#7c3aed'
      }
    },
    {
      name: '评论数',
      type: 'line',
      smooth: true,
      data: [150, 232, 201, 154, 190, 330, 410],
      itemStyle: {
        color: '#059669'
      }
    }
  ]
});

// 内容分布图表配置
const distributionChartOption = ref<ECOption>({
  title: {
    text: '内容分布',
    left: 'center',
    top: 0,
    textStyle: {
      color: '#1a1a1a',
      fontSize: 16,
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    bottom: '0'
  },
  series: [
    {
      name: '视频分类',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '教育' },
        { value: 735, name: '娱乐' },
        { value: 580, name: '科技' },
        { value: 484, name: '游戏' },
        { value: 300, name: '其他' }
      ]
    }
  ]
});

// 待办事项数据
const todoList = ref([
  { title: '审核新上传的视频内容', date: '今天 14:00' },
  { title: '更新系统公告', date: '今天 16:00' },
  { title: '处理用户反馈', date: '明天 10:00' },
  { title: '数据周报整理', date: '周五 18:00' }
]);
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

    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card class="chart-card">
          <v-chart class="trend-chart" :option="trendChartOption" autoresize />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <v-chart class="distribution-chart" :option="distributionChartOption" autoresize />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-4">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
              <el-button type="primary" text>查看全部</el-button>
            </div>
          </template>
          <ul class="todo-list">
            <li v-for="(item, index) in todoList" :key="index" class="todo-item">
              <div class="todo-title">{{ item.title }}</div>
              <div class="todo-date">{{ item.date }}</div>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.home-container {
  padding: 24px;
  background-color: #f6f8fc;
  min-height: calc(100vh - 60px);
}

.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.welcome-section h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
}

.welcome-section p {
  margin: 8px 0 0;
  opacity: 0.9;
  font-size: 16px;
}

.statistics-cards {
  margin-bottom: 24px;
}

.statistics-item {
  display: flex;
  align-items: center;
  padding: 8px;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.icon-wrapper :deep(.el-icon) {
  font-size: 24px;
  color: white;
}

.purple {
  background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
}

.blue {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
}

.green {
  background: linear-gradient(135deg, #34d399 0%, #059669 100%);
}

.orange {
  background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
}

.content {
  flex: 1;
}

.value {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.2;
}

.label {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.chart-row {
  margin-bottom: 24px;
}

.chart-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.trend-chart {
  height: 400px;
  width: 100%;
}

.distribution-chart {
  height: 400px;
  width: 100%;
}

:deep(.el-card) {
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s, box-shadow 0.2s;
}

:deep(.el-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.card-header span {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

:deep(.el-card__header) {
  border-bottom: 1px solid #f0f0f0;
  padding: 0;
}

:deep(.el-card__body) {
  padding: 20px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-title {
  flex: 1;
  margin-right: 12px;
}

.todo-date {
  font-size: 12px;
  color: #94a3b8;
}

@media (max-width: 768px) {
  .home-container {
    padding: 16px;
  }
  
  .welcome-section {
    padding: 24px;
  }
  
  .welcome-section h2 {
    font-size: 24px;
  }
  
  .statistics-cards :deep(.el-col) {
    margin-bottom: 16px;
  }
  
  .value {
    font-size: 20px;
  }

  .trend-chart,
  .distribution-chart {
    height: 300px;
  }
}
</style>
