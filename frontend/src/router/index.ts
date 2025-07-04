import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import LoginView from "@/views/auth/Login.vue"
import RegisterView from '@/views/auth/Register.vue'
import ProfileView from "@/views/user/Profile.vue"

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView
    },
    {
      path: "/:username",
      name: "UserProfile",
      component: ProfileView
    }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
