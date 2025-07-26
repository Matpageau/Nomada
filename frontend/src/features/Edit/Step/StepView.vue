<script setup lang="ts">
import MediaGallery from '@/features/Edit/components/MediaGallery.vue';
import BaseBtn from '@/components/Buttons/BaseBtn.vue';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import type { PopulatedStep } from '@/Types/PopulatedStep';
import SelectPOIMap from '@/components/Map/SelectPOIMap.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import type { Coordinate } from '@/Types/Coordinate';
import type { MarkerData } from '@/Types/Marker';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute()
const postId = route.params.postId as string
const stepId = route.params.stepId as string

const marker = ref<MarkerData | null>(null)
const medias = ref<(string | File)[]>([])
const description = ref("")
const isDataReady = ref(false)

onMounted(async () => {    
  if(stepId) {    
    const stepRes = await axios.get<PopulatedStep>(`http://localhost:3000/step/${stepId}`)
    const step = stepRes.data    

    marker.value = {coord: {lng: step.lng, lat: step.lat}}
    medias.value = step.medias.map(m => m.url)
    description.value = step.description
  }
  isDataReady.value = true
})

const setLngLat = (coordinate: Coordinate) => {  
  marker.value = {
    coord: { 
      lng: coordinate.lng,
      lat: coordinate.lat
    },
    img: marker.value?.img
  }
}

const setMedias = (med: (string | File)[]) => {  
  medias.value = med
}

watch(medias, (newMedias) => {
  if(marker.value) {
    marker.value.img = newMedias[0]
  }else{
    marker.value = {
      coord: {lng: 0, lat: 0},
      img: newMedias[0]
    }
  }
})

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
      postId: postId,
      mediaIds: [...existingIds, ...uploadedIds],
      description: description.value,
      location: {
        lng: marker.value?.coord.lng ?? null,
        lat: marker.value?.coord.lat ?? null,
      }
    }
    
    if(stepId) {
      const res = await axios.put(`http://localhost:3000/step/${stepId}`,
        payload,
        { withCredentials: true }
      )
      console.log('✅ Saved saved:', res.data)
    }else{
      const res = await axios.post(`http://localhost:3000/step`,
        payload,
        { withCredentials: true }
      )
      console.log('✅ Saved created:', res.data)
    }

    router.push(`/post/${postId}`)
  } catch (error) {
    console.error('❌ Failed to save step:', error)
  }
}
</script>

<template>
  <div class="flex">
    <Navbar />
    <div class="flex w-full">
      <div class="w-2/7 h-full p-7">
        <MediaGallery :medias="medias" @set-medias="setMedias"/>
      </div>
      <div class="flex flex-col w-5/7">
        <div class="h-75/100">
          <SelectPOIMap 
            :marker="marker"
            @update="setLngLat"
          />
        </div>
        <div class="mt-6 mr-3 h-20/100">
          <textarea 
            name="description" 
            placeholder="Description" 
            class="p-3 resize-none w-full border-1 border-neutral-900 rounded-md h-full"
            v-model="description"
          ></textarea>
        </div>
        <div class="flex justify-end h-5/100 my-6 gap-3 mr-3">
          <BaseBtn 
            text="Cancel"
            class="bg-neutral-600 hover:bg-neutral-700 px-6"
            @click="router.push(`/post/${postId}`)"
          />
          <BaseBtn 
            text="Save"
            class="bg-[var(--main)] hover:bg-[var(--main-hover)] px-6"
            @click="handleSave"
          />
        </div>
      </div>
    </div>
  </div>
</template>