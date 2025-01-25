import { createApp, type App as VueApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

// Import global styles
import './assets/styles/reset.scss'
import './styles/index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app: VueApp = createApp(App)

// Use plugins
app.use(router)
app.use(ElementPlus)
app.use(pinia)

// Mount app
app.mount('#app')
