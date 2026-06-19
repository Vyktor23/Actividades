<script setup lang="ts">
import { Search, SlidersHorizontal } from 'lucide-vue-next'
import { CATEGORIAS, PRIORIDADES } from '@/types/activity'
import { useActividadesStore } from '@/stores/actividades'

const store = useActividadesStore()
</script>

<template>
  <section class="glass-card p-4 sm:p-5">
    <div class="mb-3 flex items-center gap-2">
      <SlidersHorizontal class="h-4 w-4 text-slate-400" />
      <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Filtros y búsqueda
      </h2>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div class="relative sm:col-span-2 lg:col-span-2">
        <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          :value="store.filtros.busqueda"
          type="search"
          class="input-field !pl-10"
          placeholder="Buscar actividades..."
          @input="store.actualizarFiltros({ busqueda: ($event.target as HTMLInputElement).value })"
        />
      </div>

      <select
        class="input-field"
        :value="store.filtros.estado"
        @change="store.actualizarFiltros({ estado: ($event.target as HTMLSelectElement).value as typeof store.filtros.estado })"
      >
        <option value="todas">Todas</option>
        <option value="pendientes">Pendientes</option>
        <option value="completadas">Completadas</option>
      </select>

      <select
        class="input-field"
        :value="store.filtros.prioridad"
        @change="store.actualizarFiltros({ prioridad: ($event.target as HTMLSelectElement).value as typeof store.filtros.prioridad })"
      >
        <option value="todas">Todas las prioridades</option>
        <option v-for="p in PRIORIDADES" :key="p" :value="p">{{ p }}</option>
      </select>

      <select
        class="input-field"
        :value="store.filtros.categoria"
        @change="store.actualizarFiltros({ categoria: ($event.target as HTMLSelectElement).value as typeof store.filtros.categoria })"
      >
        <option value="todas">Todas las categorías</option>
        <option v-for="c in CATEGORIAS" :key="c" :value="c">{{ c }}</option>
      </select>

      <select
        class="input-field sm:col-span-2 lg:col-span-1"
        :value="store.filtros.orden"
        @change="store.actualizarFiltros({ orden: ($event.target as HTMLSelectElement).value as typeof store.filtros.orden })"
      >
        <option value="fecha-asc">Fecha ↑</option>
        <option value="fecha-desc">Fecha ↓</option>
        <option value="prioridad">Prioridad</option>
        <option value="nombre">Nombre A-Z</option>
        <option value="recientes">Más recientes</option>
      </select>
    </div>
  </section>
</template>
