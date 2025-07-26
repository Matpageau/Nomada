<script setup lang="ts">
import BaseBtn from '@/components/Buttons/BaseBtn.vue';
import BaseInput from '@/components/Inputs/BaseInput.vue';
import router from '@/router';
import axios from 'axios';
import { ref, watch } from 'vue';

const email = ref("")
const username = ref("")
const password = ref("")
const retypedPassword = ref("")

const errorMessage = ref("")

const isValidEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

const isValidPassword = (first: string, second: string) => {
  return first == second
}

watch([email, username, password, retypedPassword], () => {
  errorMessage.value = ""
  if(isValidPassword(password.value, retypedPassword.value)) {
    errorMessage.value = ""
  }else{
    errorMessage.value = "NON_MATCHING_PASSWORD"
  }
})

const handleSignup = async () => {  
  try {
    if(password.value != retypedPassword.value) return errorMessage.value = "NON_MATCHING_PASSWORD"

    await axios.post("http://localhost:3000/auth/register", {
      email: email.value,
      username: username.value.toLowerCase(),
      password: password.value
    })
    
    router.push("/login")
  } catch (error: any) {
    console.error(error)
    errorMessage.value = error?.response?.data?.code
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-screen">
    <div class="w-1/4">
      <div class="flex flex-col bg-white text-black p-6 rounded">
        <h1 class="text-center text-5xl">Signup</h1>
        <div class="flex flex-col gap-1 mt-12">
          <BaseInput
            :error="errorMessage == 'EMAIL_USED' ? 'Email already used' : ''"
            type="email"
            :is-required="true"
            placeholder="Email"
            v-model="email"
          />
          <BaseInput
            :error="errorMessage == 'USERNAME_USED' ? 'Username already used' : ''"
            type="text"
            :is-required="true"
            placeholder="Username"
            v-model="username"
          />
          <BaseInput 
            :error="errorMessage == 'NON_MATCHING_PASSWORD' ? 'Passwords does not match' : ''"
            type="password"
            :is-required="true"
            placeholder="Password"
            v-model="password"
          />
          <BaseInput 
            :error="errorMessage == 'NON_MATCHING_PASSWORD' ? 'Passwords does not match' : ''"
            type="password"
            :is-required="true"
            placeholder="Retype password"
            v-model="retypedPassword"
          />
          <div>
            <BaseBtn 
              text="Signup"
              class="text-white w-full bg-[var(--main)] hover:bg-[var(--main-hover)] mb-3"
              @click="handleSignup"
              :is-disabled="!email || !username || !password || !retypedPassword || !isValidEmail(email) || !isValidPassword(password, retypedPassword)"
            />
            <p class="text-xs text-center">Already have an account? <a href="/login" class="text-blue-500">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>