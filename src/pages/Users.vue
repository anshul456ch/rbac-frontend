<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-teal-600">Users</h1>
      <router-link
        to="/dashboard"
        class="text-sm text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </router-link>
    </div>

    <div class="overflow-x-auto">
      <table
        class="min-w-full bg-white border rounded-lg shadow text-sm sm:text-base"
      >
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 text-left">ID</th>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Roles</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="u in users"
            :key="u.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="p-3">{{ u.id }}</td>
            <td class="p-3">{{ u.name }}</td>
            <td class="p-3">{{ u.email }}</td>
            <td class="p-3">
              <ul class="list-disc pl-4 text-sm">
                <li v-for="r in u.Roles" :key="r.id">{{ r.name }}</li>
              </ul>
            </td>
            <td class="p-3">
              <Button color="primary" @click="openAssignRole(u.id)"
                >Assign Role</Button
              >
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="5" class="p-3 text-center text-gray-500">
              No users found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for assigning role -->
    <Modal :show="showModal" @close="showModal = false">
      <h2 class="text-xl font-bold mb-4">Assign Role</h2>
      <form @submit.prevent="assignRole" class="space-y-4">
        <select
          v-model="selectedRoleId"
          class="border rounded-lg p-2 w-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        >
          <option disabled value="">Select a role</option>
          <option v-for="r in roles" :value="r.id" :key="r.id">
            {{ r.name }}
          </option>
        </select>
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

const users = ref([]);
const roles = ref([]);
const showModal = ref(false);
const selectedUserId = ref(null);
const selectedRoleId = ref("");
const router = useRouter();

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const fetchUsers = async () => {
  try {
    const res = await api.get("/users");
    users.value = res.data;
  } catch (err) {
    if (err.response?.status === 403 || err.response?.status === 401) {
      alert("Not authorized!");
      router.push("/");
    }
  }
};

const fetchRoles = async () => {
  try {
    const res = await api.get("/roles");
    roles.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const openAssignRole = (userId) => {
  selectedUserId.value = userId;
  showModal.value = true;
};

const assignRole = async () => {
  try {
    await api.post("/roles/assign-role", {
      userId: selectedUserId.value,
      roleId: selectedRoleId.value,
    });
    showModal.value = false;
    fetchUsers();
  } catch (err) {
    alert(err.response?.data?.message || "Error assigning role");
  }
};

onMounted(() => {
  fetchUsers();
  fetchRoles();
});
</script>
