<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import StatsPanel from '@/components/actividades/StatsPanel.vue'
import ActivityForm from '@/components/actividades/ActivityForm.vue'
import ActivityFilters from '@/components/actividades/ActivityFilters.vue'
import ActivityList from '@/components/actividades/ActivityList.vue'
import { useActividadesStore } from '@/stores/actividades'
import type { Actividad } from '@/types/activity'

const store = useActividadesStore()
const actividadEditando = ref<Actividad | null>(null)

function editarActividad(id: string) {
  const actividad = store.obtenerPorId(id)
  if (actividad) {
    actividadEditando.value = actividad
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function cancelarEdicion() {
  actividadEditando.value = null
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-brand-950/20">
    <AppHeader />

    <main class="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:space-y-8">
      <StatsPanel />

      <div class="grid gap-6 lg:grid-cols-5 lg:gap-8">
        <div class="lg:col-span-2">
          <ActivityForm
            :actividad-editar="actividadEditando"
            @cancelar-edicion="cancelarEdicion"
            @guardado="cancelarEdicion"
          />
        </div>

        <div class="space-y-4 lg:col-span-3">
          <ActivityFilters />
          <ActivityList @editar="editarActividad" />
        </div>
      </div>
    </main>

    <footer class="border-t border-slate-200/80 py-6 text-center text-xs text-slate-400 dark:border-slate-800/80 dark:text-slate-500">
      Actividades v2.0 — Proyecto Educativo
    </footer>
  </div>
</template>
