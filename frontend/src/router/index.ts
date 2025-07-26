import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import LoginView from "@/features/Auth/Login.vue"
import Signup from '@/features/Auth/Signup.vue'
import ProfileView from "@/features/Profile/ProfileView.vue"
import TripListView from '@/features/Profile/components/TripListView.vue'
import EditView from '@/features/Edit/EditView.vue'
import StepView from '@/features/Edit/Step/StepView.vue'
import SettingView from '@/features/Settings/SettingView.vue'

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
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/settings",
      name: "userSettings",
      component: SettingView
    },
    {
      path: "/user/:username",
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
      path: "/post/:postId",
      children: [
        {
        path: '',
          name: 'createPost',
          component: EditView
        },
        {
          path: ":stepId",
          name: "editStep",
          component: StepView
        },
        {
          path: "new-step",
          name: "newStep",
          component: StepView
        }
      ]
    } 
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
