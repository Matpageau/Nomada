<script setup lang="ts">
import ClientMap from '@/components/Map/ClientMap.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import type { PopulatedStep } from '@/Types/PopulatedStep';
import type { MarkerData } from '@/Types/Marker';
import PostTemplate from '@/components/Cards/PostTemplate.vue';
import BaseBtn from '@/components/Buttons/BaseBtn.vue';
import router from '@/router';
import AddStepBtn from './components/AddStepBtn.vue';
import { useUserStore } from '@/stores/userStore';

const route = useRoute()
const postId = route.params.postId as string
const steps = ref<PopulatedStep[]>([])
const userStore = useUserStore()

const isDataReady = ref(false)

onMounted( async () => {
  try {    
    const stepsRes = await axios.get<PopulatedStep[]>(`http://localhost:3000/post/${postId}/steps`)
    steps.value = stepsRes.data    

  } catch (err) {
    console.error('❌ Failed to fetch steps:', err)
  }
  isDataReady.value = true
})

const stepsLoc = computed<MarkerData[]>(() => 
  steps.value.map(s => ({
    coord: { lng: s.lng, lat: s.lat }, 
    img: s.medias?.[0]?.url ?? null
  }))
)
</script>

<template>
  <div class="flex">
    <Navbar />
    <div class="flex w-full">
      <div class="w-2/7 h-full p-7">
        <div class="flex flex-col justify-center items-center gap-4">
          <AddStepBtn @click="router.push(`/post/${postId}/new-step`)"/>
          <template v-for="step in steps" :key="step._id">
            <PostTemplate
              v-if="userStore.currentUser"
              type="step"
              :step="step"
              :user="userStore.currentUser"
              class="cursor-pointer"
              @click="router.push(`/post/${postId}/${step._id}`)"
            />
            <AddStepBtn @click="router.push(`/post/${postId}/new-step`)"/>
          </template>
        </div>
      </div>
      <div class="flex flex-col w-5/7">
        <div class="h-75/100">
          <ClientMap 
            v-if="isDataReady"
            :markers="stepsLoc"
          />
        </div>
        <div class="mt-6 mr-3 h-20/100">
          <textarea 
            name="description" 
            placeholder="Description" 
            class="p-3 resize-none w-full border-1 border-neutral-900 rounded-md h-full"
          ></textarea>
        </div>
        <div class="flex justify-end h-5/100 my-6 gap-3 mr-3">
          <BaseBtn text="Cancel" class="bg-neutral-600 hover:bg-neutral-700 px-6"/>
          <BaseBtn text="Save" class="bg-[var(--main)] hover:bg-[var(--main-hover)] px-6"/>
        </div>
      </div>
    </div>
  </div>
</template>