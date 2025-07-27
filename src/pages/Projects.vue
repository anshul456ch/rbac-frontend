<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-purple-600">Projects</h1>
      <router-link
        to="/dashboard"
        class="text-sm text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </router-link>
    </div>

    <!-- Add Project Button -->
    <Button color="primary" @click="showModal = true">+ Add Project</Button>

    <!-- Projects Table -->
    <div class="overflow-x-auto mt-6">
      <table class="min-w-full bg-white border rounded-lg shadow text-sm sm:text-base">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 text-left">ID</th>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Description</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in projects"
            :key="p.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="p-3">{{ p.id }}</td>
            <td class="p-3 font-medium">{{ p.name }}</td>
            <td class="p-3 text-gray-700">{{ p.description }}</td>
            <td class="p-3">
              <Button color="danger" @click="deleteProject(p.id)">Delete</Button>
            </td>
          </tr>
          <tr v-if="projects.length === 0">
            <td colspan="4" class="p-3 text-center text-gray-500">
              No projects found. Click <strong>Add Project</strong> to create one.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for adding project -->
    <Modal :show="showModal" @close="showModal = false">
      <h2 class="text-xl font-bold mb-4">Create Project</h2>
      <form @submit.prevent="createProject" class="space-y-4">
        <input
          v-model="newName"
          type="text"
          placeholder="Project name"
          class="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        />
        <input
          v-model="newDesc"
          type="text"
          placeholder="Description"
          class="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// import components
import Button from '../components/Button.vue'
import Modal from '../components/Modal.vue'

const projects = ref([])
const newName = ref('')
const newDesc = ref('')
const showModal = ref(false)
const router = useRouter()

// Axios instance with auth header
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

const fetchProjects = async () => {
  try {
    const res = await api.get('/projects')
    projects.value = res.data
  } catch (err) {
    if (err.response?.status === 403 || err.response?.status === 401) {
      alert('Not authorized!')
      router.push('/')
    }
  }
}

const createProject = async () => {
  try {
    await api.post('/projects', {
      name: newName.value,
      description: newDesc.value
    })
    newName.value = ''
    newDesc.value = ''
    showModal.value = false
    fetchProjects()
  } catch (err) {
    alert(err.response?.data?.message || 'Error creating project')
  }
}

const deleteProject = async (id) => {
  if (!confirm('Delete this project?')) return
  try {
    await api.delete(`/projects/${id}`)
    fetchProjects()
  } catch (err) {
    alert(err.response?.data?.message || 'Error deleting project')
  }
}

onMounted(fetchProjects)
</script>
