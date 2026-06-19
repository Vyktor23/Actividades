<script setup lang="ts">
import { ClipboardList, Moon, Sun, Download, Trash2 } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useActividadesStore } from '@/stores/actividades'
import { exportarCSV, exportarJSON } from '@/utils/exportData'

const { toggleTema, esOscuro } = useTheme()
const store = useActividadesStore()

function exportar(tipo: 'json' | 'csv') {
  if (store.actividades.length === 0) return
  if (tipo === 'json') exportarJSON(store.actividades)
  else exportarCSV(store.actividades)
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/80">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/25">
          <ClipboardList class="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 class="font-display text-lg font-bold tracking-tight sm:text-xl">
            Actividades
          </h1>
          <p class="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
            Control y seguimiento de tareas
          </p>
        </div>
      </div>

      <div class="flex items-center gap-1 sm:gap-2">
        <div class="relative group">
          <button class="btn-secondary !px-3" aria-label="Exportar actividades">
            <Download class="h-4 w-4" />
            <span class="hidden sm:inline">Exportar</span>
          </button>
          <div class="invisible absolute right-0 top-full z-10 mt-1 w-40 rounded-xl border border-slate-200 bg-white py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 dark:border-slate-700 dark:bg-slate-800">
            <button
              class="flex w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
              @click="exportar('json')"
            >
              Exportar JSON
            </button>
            <button
              class="flex w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
              @click="exportar('csv')"
            >
              Exportar CSV
            </button>
          </div>
        </div>

        <button
          v-if="store.estadisticas.completadas > 0"
          class="btn-secondary !px-3 text-red-600 dark:text-red-400"
          title="Limpiar completadas"
          @click="store.limpiarCompletadas()"
        >
          <Trash2 class="h-4 w-4" />
          <span class="hidden sm:inline">Limpiar</span>
        </button>

        <button
          class="btn-icon"
          :aria-label="esOscuro ? 'Modo claro' : 'Modo oscuro'"
          @click="toggleTema()"
        >
          <Sun v-if="esOscuro" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>
      </div>
    </div>
  </header>
</template>
