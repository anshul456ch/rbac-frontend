<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-purple-600 mb-4">Projects</h1>

    <!-- Add Project Form -->
    <form @submit.prevent="createProject" class="flex space-x-2 mb-6">
      <input
        v-model="newName"
        type="text"
        placeholder="Project name"
        class="border rounded-lg p-2 flex-1 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        required
      />
      <input
        v-model="newDesc"
        type="text"
        placeholder="Description"
        class="border rounded-lg p-2 flex-1 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        required
      />
      <button
        type="submit"
        class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
      >
        Add
      </button>
    </form>

    <!-- Projects Table -->
    <table class="min-w-full bg-white border rounded-lg shadow">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-left">ID</th>
          <th class="p-3 text-left">Name</th>
          <th class="p-3 text-left">Description</th>
          <th class="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in projects" :key="p.id" class="border-t">
          <td class="p-3">{{ p.id }}</td>
          <td class="p-3">{{ p.name }}</td>
          <td class="p-3">{{ p.description }}</td>
          <td class="p-3">
            <button
              @click="deleteProject(p.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const projects = ref([]);
const newName = ref("");
const newDesc = ref("");
const router = useRouter();

// Axios instance with auth header
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const fetchProjects = async () => {
  try {
    const res = await api.get("/projects");
    projects.value = res.data;
  } catch (err) {
    if (err.response?.status === 403 || err.response?.status === 401) {
      alert("Not authorized!");
      router.push("/");
    }
  }
};

const createProject = async () => {
  try {
    await api.post("/projects", {
      name: newName.value,
      description: newDesc.value,
    });
    newName.value = "";
    newDesc.value = "";
    fetchProjects();
  } catch (err) {
    alert(err.response?.data?.message || "Error creating project");
  }
};

const deleteProject = async (id) => {
  if (!confirm("Delete this project?")) return;
  try {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  } catch (err) {
    alert(err.response?.data?.message || "Error deleting project");
  }
};

onMounted(fetchProjects);
</script>
