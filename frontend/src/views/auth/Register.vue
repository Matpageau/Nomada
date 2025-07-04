<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { reactive, ref } from 'vue';

const form = reactive({
  email: "",
  password: "",
  retypedPassword: "",
  username: "",
  fullName: ""
})

const errorMessage = ref("")

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  
  try {
    if(form.password != form.retypedPassword) throw new Error("Password does not match...")

    await axios.post("http://localhost:3000/auth/register", {
      email: form.email,
      password: form.password,
      username: form.username.toLowerCase(),
      fullName: form.fullName
    })
    
    router.push("/login")
  } catch (error: any) {
    console.error("❌ Register error", error)

    if(error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = "Server error... Try again"
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-screen">
    <div class="w-1/4">
      <form
        @submit="handleSubmit"
        class="flex flex-col border-1 border-neutral-700 p-6 rounded"
      >
        <h1 class="text-center text-2xl font-extrabold">Nomada</h1>
        <div class="flex flex-col mt-6">
          <input 
            type="text"
            class="border-1 p-2 text-sm outline-none"
            placeholder='E-mail'
            v-model="form.email"
            required
          >
          <input 
            type="password"
            class='border-1 p-2 text-sm mt-2 outline-none bg-[var(--input-background)]'
            placeholder='Password'
            v-model="form.password"
            required
          >
          <input 
            type="password"
            class='border-1 p-2 text-sm mt-2 outline-none bg-[var(--input-background)]'
            placeholder='Retype password'
            v-model="form.retypedPassword"
            required
          >
          <input 
            type="text"
            class='border-1 p-2 text-sm mt-2 outline-none bg-[var(--input-background)]'
            placeholder='Username'
            v-model="form.username"
            required
          >
          <input 
            type="text"
            class='border-1 p-2 text-sm mt-2 outline-none bg-[var(--input-background)]'
            placeholder='Full name'
            v-model="form.fullName"
            required
          >
          <button
            type="submit"
            class="bg-[var(--main)] rounded mt-3 cursor-pointer hover:bg-[var(--main-hover)] transition-all disabled:cursor-auto disabled:opacity-50 disabled:hover:bg-[var(--main)]"
            :disabled="!(form.username && form.password)"
          >
            Create account
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
      </form>
      <div class="flex flex-col border-1 border-neutral-700 p-6 rounded mt-3 w-full">
        <p class="text-ms text-center">You have an an account ? <a class="text-[var(--main)]" href="/login">Login</a></p>
      </div>
    </div>
  </div>
</template>