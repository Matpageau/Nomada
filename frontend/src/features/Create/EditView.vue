<script setup lang="ts">
import ClientMap from '@/components/Map/ClientMap.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { useRoute } from 'vue-router';
import AddStepBtn from './components/AddStepBtn.vue';
import { onMounted, ref } from 'vue';
import StepModal from './components/StepModal.vue';

const route = useRoute()
const postId = route.params.postId as string
const isStepModalOpen = ref(false)

const openStepModal = () => {
  isStepModalOpen.value = true
}

const closeStepModal = () => {
  isStepModalOpen.value = false
}

onMounted(() => {

})

</script>

<template>
  <div class="flex">
    <StepModal 
      v-if="isStepModalOpen"
      @close="closeStepModal"
      :post-id="postId"
    />
    <Navbar />
    <div class="flex w-full p-10">
      <div class="w-1/3">
        <div class="bg-neutral-800 rounded-md p-3">
          <input 
            type="text"
            placeholder="Description"
            class="w-full"
          >
        </div>
        <div class="flex justify-center mt-3">
          <AddStepBtn @click="openStepModal"/>
        </div>
      </div>
      <div class="w-2/3 ml-10 h-full">
        <ClientMap />
      </div>
    </div>
  </div>
</template>