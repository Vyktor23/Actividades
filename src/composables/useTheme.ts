import { ref, watch, computed } from 'vue'

type Tema = 'light' | 'dark'

const tema = ref<Tema>(
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'
)

function aplicarTema(valor: Tema): void {
  document.documentElement.classList.toggle('dark', valor === 'dark')
}

export function useTheme() {
  watch(tema, (valor) => {
    aplicarTema(valor)
    localStorage.setItem('tema', valor)
  })

  function toggleTema(): void {
    tema.value = tema.value === 'light' ? 'dark' : 'light'
  }

  const esOscuro = computed(() => tema.value === 'dark')

  return { tema, toggleTema, esOscuro }
}
