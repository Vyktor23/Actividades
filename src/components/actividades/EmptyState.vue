<script setup lang="ts">
import { ClipboardList } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
      <ClipboardList class="h-8 w-8 text-slate-400" />
    </div>
    <h3 class="font-display text-lg font-semibold text-slate-700 dark:text-slate-300">
      No hay actividades
    </h3>
    <p class="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
      Registra tu primera actividad usando el formulario de arriba. Tus tareas se guardarán automáticamente.
    </p>
  </div>
</template>
