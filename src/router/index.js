import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Collection from '../views/Collection.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/collection/:symbol',
    name: 'Collection',
    component: Collection
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
