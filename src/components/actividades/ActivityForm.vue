<script setup lang="ts">
import { ref, watch } from 'vue'
import { Plus, X } from 'lucide-vue-next'
import type { Actividad, ActividadFormData, Prioridad } from '@/types/activity'
import { CATEGORIAS, PRIORIDADES } from '@/types/activity'
import { obtenerFechaMinima } from '@/utils/dates'
import { useActividadesStore } from '@/stores/actividades'

const props = defineProps<{
  actividadEditar?: Actividad | null
}>()

const emit = defineEmits<{
  guardado: []
  cancelarEdicion: []
}>()

const store = useActividadesStore()

const formulario = ref<ActividadFormData>({
  nombre: '',
  fecha: '',
  prioridad: 'Media',
  categoria: 'General',
  descripcion: '',
})

const enviando = ref(false)
const modoEdicion = ref(false)

watch(
  () => props.actividadEditar,
  (actividad) => {
    if (actividad) {
      modoEdicion.value = true
      formulario.value = {
        nombre: actividad.nombre,
        fecha: actividad.fecha,
        prioridad: actividad.prioridad,
        categoria: actividad.categoria,
        descripcion: actividad.descripcion ?? '',
      }
    } else {
      modoEdicion.value = false
      resetearFormulario()
    }
  },
  { immediate: true }
)

function resetearFormulario() {
  formulario.value = {
    nombre: '',
    fecha: '',
    prioridad: 'Media',
    categoria: 'General',
    descripcion: '',
  }
}

async function enviar() {
  enviando.value = true
  try {
    let exito: boolean
    if (modoEdicion.value && props.actividadEditar) {
      exito = await store.actualizar(props.actividadEditar.id, formulario.value)
      if (exito) emit('cancelarEdicion')
    } else {
      exito = await store.agregar(formulario.value)
      if (exito) resetearFormulario()
    }
    if (exito) emit('guardado')
  } finally {
    enviando.value = false
  }
}

function cancelar() {
  emit('cancelarEdicion')
  resetearFormulario()
}

const prioridadClases: Record<Prioridad, string> = {
  Alta: 'border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
  Media: 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300',
  Baja: 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
}
</script>

<template>
  <section class="glass-card p-5 sm:p-6">
    <div class="mb-5 flex items-center justify-between">
      <h2 class="font-display text-lg font-bold">
        {{ modoEdicion ? 'Editar actividad' : 'Nueva actividad' }}
      </h2>
      <button
        v-if="modoEdicion"
        class="btn-icon"
        aria-label="Cancelar edición"
        @click="cancelar"
      >
        <X class="h-5 w-5" />
      </button>
    </div>

    <form class="space-y-4" @submit.prevent="enviar">
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="nombre" class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Nombre de la actividad *
          </label>
          <input
            id="nombre"
            v-model="formulario.nombre"
            type="text"
            class="input-field"
            placeholder="Ej: Entregar informe de prácticas"
            maxlength="120"
            required
          />
        </div>

        <div>
          <label for="fecha" class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Fecha límite *
          </label>
          <input
            id="fecha"
            v-model="formulario.fecha"
            type="date"
            class="input-field"
            :min="obtenerFechaMinima()"
            required
          />
        </div>

        <div>
          <label for="categoria" class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Categoría
          </label>
          <select id="categoria" v-model="formulario.categoria" class="input-field">
            <option v-for="cat in CATEGORIAS" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <div class="sm:col-span-2">
          <span class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Prioridad
          </span>
          <div class="flex flex-wrap gap-2">
            <label
              v-for="p in PRIORIDADES"
              :key="p"
              class="cursor-pointer"
            >
              <input
                v-model="formulario.prioridad"
                type="radio"
                :value="p"
                class="peer sr-only"
              />
              <span
                class="inline-flex rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all"
                :class="[
                  prioridadClases[p],
                  formulario.prioridad === p ? 'ring-2 ring-brand-500/30' : 'opacity-60 hover:opacity-100',
                ]"
              >
                {{ p }}
              </span>
            </label>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="descripcion" class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Descripción <span class="text-slate-400">(opcional)</span>
          </label>
          <textarea
            id="descripcion"
            v-model="formulario.descripcion"
            class="input-field min-h-[80px] resize-y"
            placeholder="Detalles adicionales sobre la actividad..."
            maxlength="500"
            rows="3"
          />
        </div>
      </div>

      <div class="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <button
          v-if="modoEdicion"
          type="button"
          class="btn-secondary w-full sm:w-auto"
          @click="cancelar"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="btn-primary w-full sm:w-auto"
          :disabled="enviando"
        >
          <Plus v-if="!modoEdicion" class="h-4 w-4" />
          {{ modoEdicion ? 'Guardar cambios' : 'Agregar actividad' }}
        </button>
      </div>
    </form>
  </section>
</template>
