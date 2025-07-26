<script setup lang="ts">
import type { PopulatedStep } from '@/Types/PopulatedStep';
import type { PostType } from '@/Types/Post';
import type { UserType } from '@/Types/User';
import defaultProfile from '@/assets/imgs/defautProfile.jpg'
import axios from 'axios';
import { onMounted, ref } from 'vue';

const cityName = ref("")
const countryFlags = ref<string[] | null>(null)

const emit = defineEmits<{
  (e: 'click'): void
}>()

onMounted(async () => {
  if(props.type == "step" && props.step) {
    const res = await axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${props.step.lng}&latitude=${props.step.lat}&types=place%2Cregion&limit=1&worldview=us&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`)
    const feature = res.data.features[0]
    cityName.value = feature.properties.name

    const context = feature.properties.context
    const countryCode = context.country.country_code
    
    if(countryCode) {
      countryFlags.value = [`https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`]
    }
  }

})

const props = defineProps<{
  type: 'post' | 'step'
  user: UserType
  post?: PostType
  step?: PopulatedStep
  countries?: string[]
}>()

</script>

<template>
  <div class="w-full border-1 border-neutral-900 p-2 rounded-md" @click="emit('click')">
    <div class="flex justify-between">
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

  </div>
</template>