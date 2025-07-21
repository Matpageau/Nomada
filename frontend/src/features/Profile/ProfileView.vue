<script setup lang="ts">
import Navbar from '@/components/Navbar/Navbar.vue'
import defaultProfile from '@/assets/imgs/defautProfile.jpg'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import ClientMap from '@/components/Map/ClientMap.vue'
import MenuBtn from './components/MenuBtn.vue'
import GlobeIcon from '@/components/icons/GlobeIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'

import type { UserType } from '@/Types/User'
import type { PostType } from '@/Types/Post'

const route = useRoute()
const username = route.params.username as string
const isDraftRoute = computed(() => route.path.endsWith('/draft'))

const currentUser = ref<UserType | null>(null)
const user = ref<UserType | null>(null)
const posts = ref<PostType[]>([])

onMounted(async () => {
  try {
    const userRes = await axios.get<UserType>(`http://localhost:3000/user/by-username/${username}`)
    user.value = userRes.data

    const [meRes, postsRes] = await Promise.all([
      axios.get('http://localhost:3000/user/me', {
        withCredentials: true
      }),
      axios.get(`http://localhost:3000/post/user/${user.value._id}`)
    ])

    currentUser.value = meRes.data
    posts.value = postsRes.data
  } catch (error) {
    console.error('❌ Failed to fetch user profile:', error)
  }
})
</script>

<template>
  <div class="flex">
    <Navbar />
    <div v-if="user" class="flex w-full max-h-screen">
      <div class="flex w-1/2 p-10">
        <div class="flex flex-col w-full">
          <div class="border-b-1 border-neutral-700">
            <div class="flex">
              <img 
                :src="user.profileImg ?? defaultProfile"
                alt="Profile picture"
                class="rounded-full h-[84px] w-[84px]"
              />
              <div class="flex justify-between w-full">
                <div class="flex flex-col justify-between ml-3">
                  <p class="text-2xl">{{ user.username }}</p>
                  <p>{{ user.bio }}</p>
                </div>
                <div class="flex gap-3">
                  <p>can</p>
                  <p>can</p>
                  <p>can</p>
                  <p>can</p>
                </div>
              </div>
            </div>
            <div class="flex w-full gap-10 justify-between mt-12 mb-6">
              <p><strong>0</strong> Trips</p>
              <p><strong>0</strong> Steps</p>
              <p><strong>0</strong> Follower</p>
              <p><strong>0</strong> Subscriber</p>
            </div>
          </div>
          <div v-if="currentUser?._id === user._id" class="flex justify-evenly mt-3">
            <router-link :to="`/${user.username}`" :class="{'border-b-1': !isDraftRoute}">
              <MenuBtn><GlobeIcon class="h-[30px] w-[30px]"/></MenuBtn>
            </router-link>
            <router-link :to="`/${user.username}/draft`" :class="{'border-b-1': isDraftRoute}">
              <MenuBtn><EditIcon class="h-[30px] w-[30px]"/></MenuBtn>
            </router-link>
          </div>
          <router-view :posts="posts" />
        </div>
      </div>
      <div class="w-1/2 h-full">
        <ClientMap :markers="[]"/>
      </div>
    </div>
  </div>
</template>
