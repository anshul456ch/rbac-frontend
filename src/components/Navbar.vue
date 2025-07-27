<template>
  <nav
    class="bg-gray-800 text-white px-6 py-4 flex justify-between items-center"
  >
    <div class="font-bold text-lg">RBAC App</div>
    <div class="space-x-4">
      <router-link to="/dashboard" class="hover:underline"
        >Dashboard</router-link
      >
      <router-link to="/projects" class="hover:underline">Projects</router-link>
      <router-link to="/roles" class="hover:underline">Roles</router-link>

      <button
        @click="logout"
        class="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/");
};
</script>
