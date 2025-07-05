<script setup lang="ts">
import BaseModal from '@/components/Modals/BaseModal.vue';
import MediaGallery from '@/features/Create/components/MediaGallery.vue';
import ClientMap from '@/components/Map/ClientMap.vue';
import BaseBtn from '@/components/Buttons/BaseBtn.vue';
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps<{
  postId: string
  stepId?: string | null
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const lngLat = ref([0,0])
const medias = ref<string[]>([])
const description = ref("")

const setLngLat = (lng: number, lat: number) => {
  lngLat.value = [lng, lat]
}

const setMedias = (med: string[]) => {
  medias.value = med
}

const handleSave = async () => {
  try {
    const payload = {
      postId: props.postId,
      medias: medias.value,
      description: description.value,
      location: {
        lng: lngLat.value[0],
        lat: lngLat.value[1],
      }
    }
    
    if(props.stepId) {
      const res = await axios.put(`http://localhost:3000/step/${props.stepId}`,
        payload
      )
      console.log('✅ Saved saved:', res.data)
    }else{
      const res = await axios.post(`http://localhost:3000/step`,
        payload,
        { withCredentials: true }
      )
      console.log('✅ Saved created:', res.data)
    }

    emit('close')
  } catch (error) {
    console.error('❌ Failed to save step:', error)
  }
}

</script>

<template>
  <BaseModal @close="emit('close')">
    <div class="flex flex-grow z-100 h-[80vh]">
      <div class="flex flex-col w-1/2 shrink-0 h-full">
        <div class="flex-[3] h-3/5 overflow-hidden">
          <MediaGallery @set-medias="setMedias"/>
        </div>
        <textarea 
          name="description"
          class="flex-[2] mt-5 h-2/5 resize-none w-full"
          v-model="description"
        ></textarea>
      </div>
      <div class="ml-2 w-1/2 h-full">
        <ClientMap :can-select-p-o-i="true" @poi-selected="setLngLat"/>
      </div>
    </div>
    <BaseBtn 
      text="Save"
      class="self-end mt-2 bg-[var(--main)] hover:bg-[var(--main-hover)] transition-colors"
      @click="handleSave"
    />
  </BaseModal>
</template>