import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import LoginView from "@/views/auth/Login.vue"
import RegisterView from '@/views/auth/Register.vue'
import ProfileView from "@/features/Profile/ProfileView.vue"
import TripListView from '@/features/Profile/components/TripListView.vue'
import EditView from '@/features/Create/EditView.vue'

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
      component: ProfileView,
      children: [
        {
          path: "",
          name: "userProfile",
          component: TripListView
        },
        {
          path: "draft",
          name: "userProfileDraft",
          component: TripListView
        }
      ]
    },
    {
      path: "/post/:postId/edit",
      name: "create post",
      component: EditView
    }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
