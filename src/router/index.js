import { createRouter, createWebHistory } from 'vue-router'

// Import pages (we will create them next)
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Projects from '../pages/Projects.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/projects', name: 'Projects', component: Projects },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'Login' && !token) next({ name: 'Login' })
  else next()
})

export default router
