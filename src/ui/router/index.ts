import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '../pages/auth/login.page.vue'
import RegisterPage from '../pages/auth/register.page.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    name: 'register',
    component: RegisterPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
