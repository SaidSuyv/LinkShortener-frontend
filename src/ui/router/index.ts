import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '../pages/auth/login.page.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: LoginPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
