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
    <div v-if="user" class="flex w-full p-10 max-h-screen">
      <div class="flex w-1/2">
        <div class="flex flex-col w-full">
          <div class="p-10 border-b-1 border-neutral-700">
            <div class="flex">
              <div class="w-1/3">
                <img 
                  :src="user.profileImg ?? defaultProfile"
                  alt="Profile picture"
                  class="rounded-full h-[120px] w-[120px]"
                />
              </div>
              <div class="flex flex-col w-2/3 justify-evenly">
                <p class="text-2xl">{{ user.username }}</p>
                <div class="flex gap-10">
                  <p><strong></strong> Travel</p>
                  <p><strong></strong> Km Travelled</p>
                  <p><strong></strong> Follower</p>
                  <p><strong></strong> Following</p>
                </div>
                <p>{{ user.bio }}</p>
              </div>
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

      <div class="w-1/2 ml-5 h-full">
        <ClientMap :markers="[]"/>
      </div>
    </div>
  </div>
</template>
