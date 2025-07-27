import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'vue3-toastify/dist/index.css'
// import { Vue3Toastify } from 'vue3-toastify'



createApp(App).use(router).mount('#app')
