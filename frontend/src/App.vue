<script setup lang="ts">
import router from './router'
import { useUserStore } from './stores/UserStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(async () => {
  try {
    await userStore.fetchUser()
    if (!userStore.currentUser) {
      router.push('/login')
    }
  } catch (e) {
    console.error(e)
    router.push('/login')
  }
})
</script>

<template>
  <RouterView />
</template>
