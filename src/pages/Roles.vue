<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-indigo-600">Roles</h1>
      <router-link
        to="/dashboard"
        class="text-sm text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </router-link>
    </div>

    <!-- Add Role Button -->
    <Button color="primary" @click="showModal = true">+ Add Role</Button>

    <!-- Roles Table -->
    <div class="overflow-x-auto mt-6">
      <table
        class="min-w-full bg-white border rounded-lg shadow text-sm sm:text-base"
      >
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 text-left">ID</th>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="r in roles"
            :key="r.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="p-3">{{ r.id }}</td>
            <td class="p-3 font-medium">{{ r.name }}</td>
            <td class="p-3">
              <!-- Future: view permissions or delete -->
            </td>
          </tr>
          <tr v-if="roles.length === 0">
            <td colspan="3" class="p-3 text-center text-gray-500">
              No roles found. Click <strong>Add Role</strong> to create one.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for adding role -->
    <Modal :show="showModal" @close="showModal = false">
      <h2 class="text-xl font-bold mb-4">Create Role</h2>
      <form @submit.prevent="createRole" class="space-y-4">
        <input
          v-model="newRoleName"
          type="text"
          placeholder="Role name"
          class="border rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <div class="flex justify-end space-x-2">
          <Button color="primary" type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";

const roles = ref([]);
const newRoleName = ref("");
const showModal = ref(false);
const router = useRouter();

// Axios instance with auth header
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const fetchRoles = async () => {
  try {
    const res = await api.get("/roles");
    roles.value = res.data;
  } catch (err) {
    if (err.response?.status === 403 || err.response?.status === 401) {
      alert("Not authorized!");
      router.push("/");
    }
  }
};

const createRole = async () => {
  try {
    await api.post("/roles", { name: newRoleName.value });
    newRoleName.value = "";
    showModal.value = false;
    fetchRoles();
  } catch (err) {
    alert(err.response?.data?.message || "Error creating role");
  }
};

onMounted(fetchRoles);
</script>
