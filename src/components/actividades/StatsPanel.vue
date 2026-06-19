<script setup lang="ts">
import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertTriangle,
  CalendarDays,
  Flame,
} from 'lucide-vue-next'
import { useActividadesStore } from '@/stores/actividades'

const store = useActividadesStore()

const tarjetas = [
  {
    key: 'total',
    label: 'Total',
    icon: ListTodo,
    color: 'from-brand-500 to-brand-600',
    bgLight: 'bg-brand-50 dark:bg-brand-950/50',
    textColor: 'text-brand-600 dark:text-brand-400',
    get value() {
      return store.estadisticas.total
    },
  },
  {
    key: 'pendientes',
    label: 'Pendientes',
    icon: Clock,
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/50',
    textColor: 'text-amber-600 dark:text-amber-400',
    get value() {
      return store.estadisticas.pendientes
    },
  },
  {
    key: 'completadas',
    label: 'Completadas',
    icon: CheckCircle2,
    color: 'from-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/50',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    get value() {
      return store.estadisticas.completadas
    },
  },
  {
    key: 'hoy',
    label: 'Para hoy',
    icon: CalendarDays,
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50 dark:bg-blue-950/50',
    textColor: 'text-blue-600 dark:text-blue-400',
    get value() {
      return store.estadisticas.hoy
    },
  },
  {
    key: 'vencidas',
    label: 'Vencidas',
    icon: AlertTriangle,
    color: 'from-red-500 to-rose-600',
    bgLight: 'bg-red-50 dark:bg-red-950/50',
    textColor: 'text-red-600 dark:text-red-400',
    get value() {
      return store.estadisticas.vencidas
    },
  },
  {
    key: 'alta',
    label: 'Alta prioridad',
    icon: Flame,
    color: 'from-purple-500 to-violet-600',
    bgLight: 'bg-purple-50 dark:bg-purple-950/50',
    textColor: 'text-purple-600 dark:text-purple-400',
    get value() {
      return store.estadisticas.altaPrioridad
    },
  },
]
</script>

<template>
  <section aria-label="Estadísticas">
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
      <article
        v-for="tarjeta in tarjetas"
        :key="tarjeta.key"
        class="glass-card group p-4 transition-all duration-300 hover:shadow-md"
      >
        <div class="flex items-start justify-between">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm"
            :class="tarjeta.color"
          >
            <component :is="tarjeta.icon" class="h-4 w-4 text-white" />
          </div>
        </div>
        <p class="mt-3 font-display text-2xl font-bold tracking-tight">
          {{ tarjeta.value }}
        </p>
        <p class="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          {{ tarjeta.label }}
        </p>
      </article>
    </div>
  </section>
</template>
