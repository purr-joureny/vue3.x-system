import { createApp, type App as VueApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import pinia from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VChart from 'vue-echarts'

// Import global styles
import './assets/styles/reset.scss'

const app: VueApp = createApp(App)

// Use plugins
app.component('v-chart', VChart);
app.use(pinia)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
