<script setup lang="ts">
import { computed } from 'vue'
import { SearchX } from 'lucide-vue-next'
import ActivityCard from './ActivityCard.vue'
import EmptyState from './EmptyState.vue'
import { useActividadesStore } from '@/stores/actividades'

const emit = defineEmits<{
  editar: [id: string]
}>()

const store = useActividadesStore()

const hayActividades = computed(() => store.actividades.length > 0)
const hayResultados = computed(() => store.actividadesFiltradas.length > 0)
</script>

<template>
  <section>
    <div class="mb-4 flex items-center justify-between">
      <h2 class="font-display text-lg font-bold">
        Mis actividades
        <span
          v-if="hayActividades"
          class="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400"
        >
          ({{ store.actividadesFiltradas.length }})
        </span>
      </h2>
    </div>

    <EmptyState v-if="!hayActividades" />

    <div
      v-else-if="!hayResultados"
      class="flex flex-col items-center py-12 text-center"
    >
      <SearchX class="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
      <p class="text-sm text-slate-500 dark:text-slate-400">
        No se encontraron actividades con los filtros actuales.
      </p>
    </div>

    <TransitionGroup
      v-else
      tag="div"
      name="list"
      class="grid gap-3 sm:gap-4"
    >
      <ActivityCard
        v-for="actividad in store.actividadesFiltradas"
        :key="actividad.id"
        :actividad="actividad"
        @editar="emit('editar', $event)"
      />
    </TransitionGroup>
  </section>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
