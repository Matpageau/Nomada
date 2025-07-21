<script setup lang="ts">
import type { UserType } from '@/Types/User';
import type { StepType } from '@/Types/step';
import defaultProfile from '@/assets/imgs/defautProfile.jpg'

type Props = {
  type: 'post'
  user: UserType
  countries: string[]
 } | {
  type: "step"
  user: UserType
  country: string
  steps: number
 }

const props = defineProps<Props>()
</script>

<template>
  <div class="w-full border-1 border-neutral-900 p-2 rounded-md">
    <div class="flex justify-between">
      <div class="flex items-center">
        <img :src="props.user.profileImg ?? defaultProfile" alt="user image" class="h-[38px] w-[38px] rounded-full">
        <p class="ml-1 text-xl">{{ props.user.username }}</p>
      </div>
      <div class="flex gap-1">
        <!-- remplacer par le drapeau du pays -->
        <p v-if="props.type == 'post'" v-for="country in props.countries" :key="country">
          {{ country }}
        </p>
        <p v-else>
          {{ props.country }}
        </p>
      </div>
    </div>

  </div>
</template>