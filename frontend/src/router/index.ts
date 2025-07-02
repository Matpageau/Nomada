import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from "../views/user/Login.vue"
import Profile from "../views/user/Profile.vue"

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/auth/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/:username",
      name: "UserProfile",
      component: Profile
    }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
