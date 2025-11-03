import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '../pages/auth/login.page.vue'
import RegisterPage from '../pages/auth/register.page.vue'
import ForgotPasswordPage from '../pages/auth/forgot-password.page.vue'
import ResetPasswordPage from '../pages/auth/reset-password.page.vue'

import { useUserStore } from '@/ui/stores/user.store'

import DashboardLayout from '../layout/dashboard.layout.vue'
import HomePage from '../pages/dashboard/home.page.vue'
import LinksPage from '../pages/dashboard/links.page.vue'
import SettingsPage from '../pages/dashboard/settings.page.vue'
import { AuthTokenStorage } from '@/infrastructure/services/auth-token-storage.service'
import { CheckAuthStatus } from '@/application/use-cases/auth/check-status.usecase'

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
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: { name: 'home' },
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard/home',
        name: 'home',
        component: HomePage,
      },
      {
        path: '/dashboard/links',
        name: 'links',
        component: LinksPage,
      },
      {
        path: '/dashboard/settings',
        name: 'settings',
        component: SettingsPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const tokenService = new AuthTokenStorage()

router.beforeEach((to, from) => {
  const useCase = new CheckAuthStatus(tokenService)
  const isAuthenticated = useCase.execute()
  if (to.path.includes('dashboard') && !isAuthenticated) return { name: 'login' }
})

export default router
