<script setup lang="ts">
import ClientMap from '@/components/Map/ClientMap.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { useRoute } from 'vue-router';
import AddStepBtn from './components/AddStepBtn.vue';
import { onMounted, ref } from 'vue';
import StepModal from './components/StepModal.vue';
import axios from 'axios';
import StepCard from './components/StepCard.vue';
import type { PopulatedStep } from '@/Types/PopulatedStep';

const route = useRoute()
const postId = route.params.postId as string
const isStepModalOpen = ref(false)
const currentStepId = ref<string | null>(null)
const steps = ref<PopulatedStep[]>([])

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
})

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
    <div class="flex w-full p-10">
      <div class="w-1/3 h-full">
        <div class="bg-neutral-800 rounded-md p-3">
          <input 
            type="text"
            placeholder="Description"
            class="w-full"
          >
        </div>
        <div class="flex flex-col items-center gap-2 mt-3">
          <AddStepBtn @click="openStepModal(true)"/>
          <template 
            v-for="step in steps"
            :key="step._id?.toString()"
          >
            <StepCard
              :step="step"
              :onclick="() => openStepModal(false, step._id?.toString())"
            />
          <AddStepBtn @click="openStepModal(true)"/>
        </template>
        </div>
      </div>
      <div class="w-2/3 ml-10 h-full">
        <ClientMap />
      </div>
    </div>
  </div>
</template>