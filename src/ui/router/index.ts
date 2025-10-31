import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '../pages/auth/login.page.vue'
import RegisterPage from '../pages/auth/register.page.vue'
import ForgotPasswordPage from '../pages/auth/forgot-password.page.vue'
import ResetPasswordPage from '../pages/auth/reset-password.page.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordPage,
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
