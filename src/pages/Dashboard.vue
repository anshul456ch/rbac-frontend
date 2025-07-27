<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-green-600 mb-4">Dashboard</h1>
    <p class="text-gray-700">You are logged in! 🎉</p>
    <button @click="logout"
            class="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
      Logout
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}
</script>


<style scoped></style>
