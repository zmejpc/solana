import { createStore } from 'vuex'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'

import './assets/scss/app.scss'

createApp(App)
.use(createStore(store))
.use(router)
.mount('#app')
