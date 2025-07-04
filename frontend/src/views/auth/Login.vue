<script setup lang="ts">
import axios from "axios"
import { ref } from "vue"
import { reactive } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()

const form = reactive({
  username: "",
  password: ""
})

const errorMessage = ref("")

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  
  try {
    await axios.post("http://localhost:3000/auth/login", {
      username: form.username.toLowerCase(),
      password: form.password
    }, {
      withCredentials: true
    })
    
    router.push("/")
  } catch (error: any) {
    console.error("❌ Login error", error)

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
            class="border-1 p-2 mt-2 text-sm outline-none"
            placeholder='Username or e-mail'
            v-model="form.username"
            required
          >
          <input 
            type="password"
            class="border-1 p-2 mt-2 text-sm outline-none"
            placeholder='Password'
            v-model="form.password"
            required
          >
          <button
            type="submit"
            class="bg-[var(--main)] rounded mt-3 cursor-pointer hover:bg-[var(--main-hover)] transition-all disabled:cursor-auto disabled:opacity-50 disabled:hover:bg-[var(--main)]"
            :disabled="!(form.username && form.password)"
          >
            Login
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
      </form>
      <div class="flex flex-col border-1 border-neutral-700 p-6 rounded mt-3 w-full">
        <p class="text-ms text-center">You d'ont have an an account ? <a class="text-[var(--main)]" href="/register">Create one</a></p>
      </div>
    </div>
  </div>
</template>