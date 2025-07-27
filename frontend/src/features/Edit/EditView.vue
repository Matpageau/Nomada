<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import ClientMap from '@/components/Map/ClientMap.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import PostTemplate from '@/components/Cards/PostTemplate.vue';
import BaseBtn from '@/components/Buttons/BaseBtn.vue';
import router from '@/router';
import AddStepBtn from './components/AddStepBtn.vue';
import BaseModal from '@/components/Modals/BaseModal.vue';
import type { PopulatedStep } from '@/Types/PopulatedStep';
import type { MarkerData } from '@/Types/Marker';

import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore()

const route = useRoute()
const postId = route.params.postId as string

const description = ref("")
const steps = ref<PopulatedStep[]>([])
const isDataReady = ref(false)
const isModalOpen = ref(false)

const stepsLoc = computed<MarkerData[]>(() => 
  steps.value.map(s => ({
    coord: { lng: s.lng, lat: s.lat }, 
    img: s.medias?.[0]?.url ?? null
  }))
)

onMounted( async () => {
  try {    
    const stepsRes = await axios.get<PopulatedStep[]>(`http://localhost:3000/post/${postId}/steps`)
    steps.value = stepsRes.data    

  } catch (err) {
    console.error('❌ Failed to fetch steps:', err)
  }
  isDataReady.value = true
})

</script>

<template>
  <BaseModal 
    v-if="isModalOpen"
    @close="() => isModalOpen = false"
  >
    <textarea
      v-model="description"
      name="description" 
      placeholder="Description" 
      class="p-3 resize-none w-full border-1 border-neutral-900 rounded-md h-full"
    ></textarea>
  </BaseModal>
  <div class="flex">
    <Navbar />
    <div class="flex w-full">
      <div class="w-2/7 h-full p-7">
        <BaseBtn 
          text="More options"
          class="w-full bg-[var(--main)] hover:bg-[var(--main-hover)]"
          @click="() => isModalOpen = true"
        />
        <div class="flex flex-col justify-center items-center gap-3 mt-3 p-2 rounded-md">
          <AddStepBtn @click="router.push(`/post/${postId}/new-step`)"/>
          <template v-for="step in steps" :key="step._id">
            <PostTemplate
              v-if="userStore.currentUser"
              type="step"
              :step="step"
              :user="userStore.currentUser"
              @click="router.push(`/post/${postId}/${step._id}`)"
            />
            <AddStepBtn @click="router.push(`/post/${postId}/new-step`)"/>
          </template>
        </div>
      </div>
      <div class="flex flex-col w-5/7">
          <ClientMap 
            v-if="isDataReady"
            :markers="stepsLoc"
          />
        <div class="flex justify-end h-5/100 my-6 gap-3 mr-3">
          <BaseBtn text="Cancel" class="bg-neutral-600 hover:bg-neutral-700 px-6"/>
          <BaseBtn text="Save" class="bg-[var(--main)] hover:bg-[var(--main-hover)] px-6"/>
        </div>
      </div>
    </div>
  </div>
</template>