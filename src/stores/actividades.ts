import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Swal from 'sweetalert2'
import type {
  Actividad,
  ActividadFormData,
  EstadisticasActividad,
  FiltrosActividad,
  Prioridad,
} from '@/types/activity'
import { PRIORIDAD_ORDEN } from '@/types/activity'
import { esFechaHoy, esFechaPasada } from '@/utils/dates'
import { generarId } from '@/utils/exportData'

const STORAGE_KEY = 'actividades-v2'

function cargarDesdeStorage(): Actividad[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Actividad[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function guardarEnStorage(actividades: Actividad[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actividades))
}

export const useActividadesStore = defineStore('actividades', () => {
  const actividades = ref<Actividad[]>(cargarDesdeStorage())

  const filtros = ref<FiltrosActividad>({
    busqueda: '',
    prioridad: 'todas',
    categoria: 'todas',
    estado: 'todas',
    orden: 'fecha-asc',
  })

  const actividadesFiltradas = computed(() => {
    let resultado = [...actividades.value]

    const { busqueda, prioridad, categoria, estado, orden } = filtros.value

    if (busqueda.trim()) {
      const termino = busqueda.toLowerCase()
      resultado = resultado.filter(
        (a) =>
          a.nombre.toLowerCase().includes(termino) ||
          a.descripcion?.toLowerCase().includes(termino) ||
          a.categoria.toLowerCase().includes(termino)
      )
    }

    if (prioridad !== 'todas') {
      resultado = resultado.filter((a) => a.prioridad === prioridad)
    }

    if (categoria !== 'todas') {
      resultado = resultado.filter((a) => a.categoria === categoria)
    }

    if (estado === 'pendientes') {
      resultado = resultado.filter((a) => a.estado === 'pendiente')
    } else if (estado === 'completadas') {
      resultado = resultado.filter((a) => a.estado === 'completada')
    }

    switch (orden) {
      case 'fecha-asc':
        resultado.sort((a, b) => a.fecha.localeCompare(b.fecha))
        break
      case 'fecha-desc':
        resultado.sort((a, b) => b.fecha.localeCompare(a.fecha))
        break
      case 'prioridad':
        resultado.sort(
          (a, b) => PRIORIDAD_ORDEN[a.prioridad] - PRIORIDAD_ORDEN[b.prioridad]
        )
        break
      case 'nombre':
        resultado.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
        break
      case 'recientes':
        resultado.sort((a, b) => b.creadoEn.localeCompare(a.creadoEn))
        break
    }

    return resultado
  })

  const estadisticas = computed<EstadisticasActividad>(() => ({
    total: actividades.value.length,
    pendientes: actividades.value.filter((a) => a.estado === 'pendiente').length,
    completadas: actividades.value.filter((a) => a.estado === 'completada').length,
    altaPrioridad: actividades.value.filter(
      (a) => a.prioridad === 'Alta' && a.estado === 'pendiente'
    ).length,
    vencidas: actividades.value.filter(
      (a) => a.estado === 'pendiente' && esFechaPasada(a.fecha)
    ).length,
    hoy: actividades.value.filter(
      (a) => a.estado === 'pendiente' && esFechaHoy(a.fecha)
    ).length,
  }))

  function persistir(): void {
    guardarEnStorage(actividades.value)
  }

  async function validarFormulario(data: ActividadFormData): Promise<boolean> {
    if (!data.nombre.trim() || !data.fecha) {
      await Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa el nombre y la fecha de la actividad.',
        icon: 'warning',
        confirmButtonColor: '#4f46e5',
      })
      return false
    }

    if (esFechaPasada(data.fecha)) {
      await Swal.fire({
        title: 'Fecha inválida',
        text: 'La fecha no puede ser anterior a hoy.',
        icon: 'warning',
        confirmButtonColor: '#4f46e5',
      })
      return false
    }

    return true
  }

  async function agregar(data: ActividadFormData): Promise<boolean> {
    if (!(await validarFormulario(data))) return false

    const nueva: Actividad = {
      id: generarId(),
      nombre: data.nombre.trim(),
      fecha: data.fecha,
      prioridad: data.prioridad,
      categoria: data.categoria,
      descripcion: data.descripcion.trim() || undefined,
      estado: 'pendiente',
      creadoEn: new Date().toISOString(),
    }

    actividades.value.unshift(nueva)
    persistir()

    await Swal.fire({
      title: '¡Actividad registrada!',
      text: `"${nueva.nombre}" se agregó correctamente.`,
      icon: 'success',
      timer: 1800,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    })

    return true
  }

  async function actualizar(id: string, data: ActividadFormData): Promise<boolean> {
    if (!(await validarFormulario(data))) return false

    const index = actividades.value.findIndex((a) => a.id === id)
    if (index === -1) return false

    actividades.value[index] = {
      ...actividades.value[index],
      nombre: data.nombre.trim(),
      fecha: data.fecha,
      prioridad: data.prioridad,
      categoria: data.categoria,
      descripcion: data.descripcion.trim() || undefined,
    }

    persistir()

    await Swal.fire({
      title: 'Actividad actualizada',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    })

    return true
  }

  async function eliminar(id: string): Promise<void> {
    const actividad = actividades.value.find((a) => a.id === id)
    if (!actividad) return

    const resultado = await Swal.fire({
      title: '¿Eliminar actividad?',
      text: `"${actividad.nombre}" se eliminará permanentemente.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (resultado.isConfirmed) {
      actividades.value = actividades.value.filter((a) => a.id !== id)
      persistir()
    }
  }

  function toggleCompletada(id: string): void {
    const actividad = actividades.value.find((a) => a.id === id)
    if (!actividad) return

    actividad.estado = actividad.estado === 'completada' ? 'pendiente' : 'completada'
    persistir()
  }

  async function limpiarCompletadas(): Promise<void> {
    const completadas = actividades.value.filter((a) => a.estado === 'completada')
    if (completadas.length === 0) return

    const resultado = await Swal.fire({
      title: '¿Limpiar completadas?',
      text: `Se eliminarán ${completadas.length} actividad(es) completada(s).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Limpiar',
      cancelButtonText: 'Cancelar',
    })

    if (resultado.isConfirmed) {
      actividades.value = actividades.value.filter((a) => a.estado !== 'completada')
      persistir()
    }
  }

  function actualizarFiltros(parcial: Partial<FiltrosActividad>): void {
    filtros.value = { ...filtros.value, ...parcial }
  }

  function obtenerPorId(id: string): Actividad | undefined {
    return actividades.value.find((a) => a.id === id)
  }

  return {
    actividades,
    filtros,
    actividadesFiltradas,
    estadisticas,
    agregar,
    actualizar,
    eliminar,
    toggleCompletada,
    limpiarCompletadas,
    actualizarFiltros,
    obtenerPorId,
  }
})

export function obtenerClasePrioridad(prioridad: Prioridad): string {
  const clases: Record<Prioridad, string> = {
    Alta: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
    Media: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    Baja: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  }
  return clases[prioridad]
}
