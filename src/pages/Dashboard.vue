<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-green-600 mb-4">Dashboard</h1>
    <p class="text-gray-700">You are logged in! 🎉</p>

    <!-- Logout button -->
    <button @click="logout"
            class="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
      Logout
    </button>

    <!-- 👇 Add this router-link below the button -->
    <router-link
      to="/projects"
      class="inline-block mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
      Go to Projects
    </router-link>
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
