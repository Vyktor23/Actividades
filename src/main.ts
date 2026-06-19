import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

function initTheme(): void {
  const guardado = localStorage.getItem('tema')
  const oscuro =
    guardado === 'dark' ||
    (!guardado && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', oscuro)
}

initTheme()

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
