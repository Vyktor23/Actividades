<script setup lang="ts">
import {
  Calendar,
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
  Tag,
} from 'lucide-vue-next'
import type { Actividad } from '@/types/activity'
import { CATEGORIA_COLORES } from '@/types/activity'
import { obtenerClasePrioridad, useActividadesStore } from '@/stores/actividades'
import {
  formatearFecha,
  obtenerEstadoFecha,
  ESTADO_FECHA_ETIQUETAS,
  ESTADO_FECHA_COLORES,
} from '@/utils/dates'

defineProps<{
  actividad: Actividad
}>()

const emit = defineEmits<{
  editar: [id: string]
}>()

const store = useActividadesStore()
</script>

<template>
  <article
    class="glass-card group overflow-hidden transition-all duration-300 hover:shadow-md"
    :class="{ 'opacity-60': actividad.estado === 'completada' }"
  >
    <div class="flex items-start gap-3 p-4 sm:p-5">
      <button
        class="mt-0.5 shrink-0 transition-transform hover:scale-110"
        :aria-label="actividad.estado === 'completada' ? 'Marcar pendiente' : 'Marcar completada'"
        @click="store.toggleCompletada(actividad.id)"
      >
        <CheckCircle2
          v-if="actividad.estado === 'completada'"
          class="h-6 w-6 text-emerald-500"
        />
        <Circle v-else class="h-6 w-6 text-slate-300 hover:text-brand-500 dark:text-slate-600" />
      </button>

      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <h3
            class="font-semibold text-slate-900 dark:text-slate-100"
            :class="{ 'line-through': actividad.estado === 'completada' }"
          >
            {{ actividad.nombre }}
          </h3>
          <span
            class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold"
            :class="obtenerClasePrioridad(actividad.prioridad)"
          >
            {{ actividad.prioridad }}
          </span>
        </div>

        <p
          v-if="actividad.descripcion"
          class="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2"
        >
          {{ actividad.descripcion }}
        </p>

        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span class="inline-flex items-center gap-1">
            <Calendar class="h-3.5 w-3.5" />
            {{ formatearFecha(actividad.fecha) }}
          </span>
          <span
            class="font-medium"
            :class="ESTADO_FECHA_COLORES[obtenerEstadoFecha(actividad.fecha, actividad.estado === 'completada')]"
          >
            {{ ESTADO_FECHA_ETIQUETAS[obtenerEstadoFecha(actividad.fecha, actividad.estado === 'completada')] }}
          </span>
          <span class="inline-flex items-center gap-1">
            <Tag class="h-3.5 w-3.5" />
            <span
              class="inline-block h-2 w-2 rounded-full"
              :class="CATEGORIA_COLORES[actividad.categoria]"
            />
            {{ actividad.categoria }}
          </span>
        </div>
      </div>

      <div class="flex shrink-0 gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
        <button
          class="btn-icon"
          aria-label="Editar"
          @click="emit('editar', actividad.id)"
        >
          <Pencil class="h-4 w-4" />
        </button>
        <button
          class="btn-icon text-red-500 hover:text-red-600 dark:text-red-400"
          aria-label="Eliminar"
          @click="store.eliminar(actividad.id)"
        >
          <Trash2 class="h-4 w-4" />
        </button>
      </div>
    </div>
  </article>
</template>
