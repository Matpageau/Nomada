<script setup lang="ts">
import BaseModal from '@/components/Modals/BaseModal.vue';
import MediaGallery from '@/features/Create/components/MediaGallery.vue';
import ClientMap from '@/components/Map/ClientMap.vue';
import BaseBtn from '@/components/Buttons/BaseBtn.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import type { PopulatedStep } from '@/Types/PopulatedStep';
import type { Coordinate } from '@/Types/Coordinate';

const props = defineProps<{
  postId: string
  stepId?: string | null
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const isDataReady = ref(false)
const lngLat = ref<Coordinate | null>(null)
const medias = ref<(string | File)[]>([])
const description = ref("")

onMounted(async () => {    
  if(props.stepId) {    
    const stepRes = await axios.get<PopulatedStep>(`http://localhost:3000/step/${props.stepId}`)
    const step = stepRes.data

    lngLat.value = {lng: step.lng, lat: step.lat}
    medias.value = step.medias.map(m => m.url)
    description.value = step.description
  }
  isDataReady.value = true
})

const setLngLat = (lng: number, lat: number) => {
  lngLat.value = {lng: lng, lat: lat}
}

const setMedias = (med: (string | File)[]) => {
  medias.value = med
}

const handleSave = async () => {
  try {

    const existingIds = medias.value.filter(m => typeof m === "string") as string[]
    const newFiles = medias.value.filter(m => m instanceof File) as File[]

    let uploadedIds: string[] = []

    if(newFiles.length > 0) {
      const formData = new FormData()
      newFiles.forEach(file => formData.append("media", file))

      const uploadRes = await axios.post(
        "http://localhost:3000/media/upload",
        formData,
        { 
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      )      

      uploadedIds = uploadRes.data.mediaIds
    }

    const payload = {
      postId: props.postId,
      mediaIds: [...existingIds, ...uploadedIds],
      description: description.value,
      location: {
        lng: lngLat.value?.lng ?? null,
        lat: lngLat.value?.lat ?? null,
      }
    }
    
    if(props.stepId) {
      const res = await axios.put(`http://localhost:3000/step/${props.stepId}`, payload)
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
          <MediaGallery
            v-if="isDataReady"
            :medias="medias"
            @set-medias="setMedias"
          />
        </div>
        <textarea 
          name="description"
          class="flex-[2] mt-5 h-2/5 resize-none w-full"
          v-model="description"
        ></textarea>
      </div>
      <div class="ml-2 w-1/2 h-full">
        <ClientMap v-if="isDataReady" :marker="lngLat ?? null" :can-select-p-o-i="true" @poi-selected="setLngLat"/>
      </div>
    </div>
    <BaseBtn 
      text="Save"
      class="self-end mt-2 bg-[var(--main)] hover:bg-[var(--main-hover)] transition-colors"
      @click="handleSave"
    />
  </BaseModal>
</template>