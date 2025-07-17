<script setup lang="ts">
import BaseBtn from "@/components/Buttons/BaseBtn.vue"
import BaseInput from "@/components/Inputs/BaseInput.vue"
import axios from "axios"
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()

const username = ref("")
const password = ref("")

const errorMessage = ref("")

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:3000/auth/login", {
      username: username.value.toLowerCase(),
      password: password.value
    }, {
      withCredentials: true
    })
    console.log(res);
    
    router.push("/")
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.code
  }
}

watch([username, password], () => {
  errorMessage.value = ""
})
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-screen">
    <div class="w-1/4">
      <div class="flex flex-col bg-white text-black p-6 rounded-md">
        <h1 class="text-center text-5xl">Login</h1>
        <div class="flex flex-col gap-1 mt-12">
          <BaseInput
            :error="errorMessage == 'USER_NOT_FOUND' ? 'User not found' : ''"
            type="text"
            :is-required="true"
            placeholder="Email or username"
            v-model="username"
          />
          <BaseInput 
            :error="errorMessage == 'WRONG_PASSWORD' ? 'Incorrect password' : ''"
            type="password"
            :is-required="true"
            placeholder="Password"
            v-model="password"
          />
          <div>
            <p class="text-xs text-center mb-3 w-full"><a href="" class="text-blue-500">Forgot password?</a></p>
            <BaseBtn 
              text="Login"
              class="text-white w-full bg-[var(--main)] hover:bg-[var(--main-hover)] mb-3"
              @click="handleLogin"
              :is-disabled="!username || !password"
            />
            <p class="text-xs text-center">Don't have an account? <a href="/signup" class="text-blue-500">Signup</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>