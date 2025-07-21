<script setup lang="ts">
import ClientMap from '@/components/Map/ClientMap.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { useRoute } from 'vue-router';
import AddStepBtn from './components/AddStepBtn.vue';
import { computed, onMounted, ref } from 'vue';
import StepModal from './components/StepModal.vue';
import axios from 'axios';
import StepCard from './components/StepCard.vue';
import type { PopulatedStep } from '@/Types/PopulatedStep';
import type { MarkerData } from '@/Types/Marker';
import PostTemplate from '@/components/Cards/PostTemplate.vue';
import type { UserType } from '@/Types/User';
import BaseBtn from '@/components/Buttons/BaseBtn.vue';

const route = useRoute()
const postId = route.params.postId as string
const isStepModalOpen = ref(false)
const currentStepId = ref<string | null>(null)
const steps = ref<PopulatedStep[]>([])

const isDataReady = ref(false)

const openStepModal = (isNew: boolean, stepId?: string) => {
  currentStepId.value = isNew ? null : stepId ?? null
  isStepModalOpen.value = true
}

const closeStepModal = () => {
  isStepModalOpen.value = false
}

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


const user: UserType = {
  _id: "adad",
  bio:"Bio test",
  email: "",
  fullName: "Matisse pageau",
  isPrivate: false,
  password:"",
  username:"matissep",
  profileImg: null
}

const countries = "CH"

</script>

<template>
  <div class="flex">
    <StepModal 
      v-if="isStepModalOpen"
      @close="closeStepModal"
      :post-id="postId"
      :step-id="currentStepId"
    />
    <Navbar />
    <div class="flex w-full">
      <div class="w-2/7 h-full p-7">
        <PostTemplate
          type="step"
          :user="user"
          :country="countries"
          :steps="1"
        />
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
          <BaseBtn text="Cancel" class="bg-neutral-600 px-6"/>
          <BaseBtn text="Save" class="bg-blue-500 px-6"/>
        </div>
      </div>
    </div>
  </div>
</template>