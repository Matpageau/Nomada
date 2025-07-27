<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

import defaultProfile from '@/assets/imgs/defautProfile.jpg'
import MediaRoulette from '@/components/Cards/MediaRoulette.vue';
import type { PopulatedStep } from '@/Types/PopulatedStep';
import type { PostType } from '@/Types/Post';
import type { UserType } from '@/Types/User';
import type { MediaType } from '@/Types/Media';

const props = defineProps<{
  type: 'post' | 'step'
  user: UserType
  post?: PostType
  step?: PopulatedStep
  countries?: string[]
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const cityName = ref("")
const countryFlags = ref<string[] | null>(null)
const medias = ref<string[]>([])
const isDataReady = ref(false)

onMounted(async () => {
  if(props.type == "step" && props.step) {
    try {
      const [resGeo, resMedias] = await Promise.all([
        axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${props.step.lng}&latitude=${props.step.lat}&types=place%2Cregion&limit=1&worldview=us&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`),
        axios.get(`http://localhost:3000/step/${props.step._id}/medias`)
      ]) 
      medias.value = (resMedias.data ?? []).map((m: MediaType) => m.url)
  
      const feature = resGeo.data.features[0]
      cityName.value = feature.properties.name
  
      const context = feature.properties.context
      const countryCode = context.country.country_code
      
      if(countryCode) {
        countryFlags.value = [`https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`]
      }
    } catch (error) {
      console.error('❌ Error in onMounted:', error)
      cityName.value = 'Inconnue'
      medias.value = []
      countryFlags.value = null
    }
  }
  isDataReady.value = true
})


</script>

<template>
  <div v-if="isDataReady" class="w-full border-1 border-neutral-900 rounded-md">
    <div class="flex justify-between p-2" @click="emit('click')">
      <div class="flex items-center">
        <img :src="props.user.profileImg ?? defaultProfile" alt="user image" class="h-11 w-11 rounded-full">
        <div class="ml-2">
          <p class="text-xl">{{ props.user.username }}</p>
          <p class="text-neutral-500">{{ cityName }}</p>
        </div>
      </div>
      <div class="flex gap-1 items-center">
        <img
          v-for="flag in countryFlags"
          :key="flag"
          :src="flag"
          alt="country flag"
          class="h-7 w-auto aspect-square object-cover rounded-full">
      </div>
    </div>
    <MediaRoulette :medias="medias"/>
  </div>
</template>