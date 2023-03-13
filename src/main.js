import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import './assets/scss/app.scss'

const pinia = createPinia()

createApp(App)
.use(pinia)
.use(router)
.mount('#app')
