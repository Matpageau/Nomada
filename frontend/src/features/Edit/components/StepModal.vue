<script setup lang="ts">
import BaseModal from '@/components/Modals/BaseModal.vue';
import MediaGallery from '@/features/Edit/components/MediaGallery.vue';
import BaseBtn from '@/components/Buttons/BaseBtn.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import type { PopulatedStep } from '@/Types/PopulatedStep';
import type { MarkerData } from '@/Types/Marker';
import SelectPOIMap from '@/components/Map/SelectPOIMap.vue';

const props = defineProps<{
  postId: string
  stepId?: string | null
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const marker = ref<MarkerData>()
const medias = ref<(string | File)[]>([])
const description = ref("")

const isDataReady = ref(false)

onMounted(async () => {    
  if(props.stepId) {    
    const stepRes = await axios.get<PopulatedStep>(`http://localhost:3000/step/${props.stepId}`)
    const step = stepRes.data

    marker.value = {coord: {lng: step.lng, lat: step.lat}, img: step.medias[0].url}
    medias.value = step.medias.map(m => m.url)
    description.value = step.description
  }
  isDataReady.value = true
})

const setLngLat = (lng: number, lat: number) => {
  if (!marker.value) return
  marker.value = {
    coord: {lng, lat},
    img: marker.value.img ?? undefined
  }
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
        lng: marker.value?.coord.lng ?? null,
        lat: marker.value?.coord.lat ?? null,
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
        <SelectPOIMap 
          v-if="isDataReady" 
          :marker="marker ?? null" 
          @update="(e) => setLngLat(e.lng, e.lat)"
        />
      </div>
    </div>
    <BaseBtn 
      text="Save"
      class="self-end mt-2 bg-[var(--main)] hover:bg-[var(--main-hover)] transition-colors"
      @click="handleSave"
    />
  </BaseModal>
</template>