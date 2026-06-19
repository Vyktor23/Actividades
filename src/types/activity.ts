export type Prioridad = 'Alta' | 'Media' | 'Baja'

export type Categoria =
  | 'General'
  | 'Estudio'
  | 'Trabajo'
  | 'Personal'
  | 'Proyecto'

export type EstadoActividad = 'pendiente' | 'completada'

export interface Actividad {
  id: string
  nombre: string
  fecha: string
  prioridad: Prioridad
  categoria: Categoria
  estado: EstadoActividad
  descripcion?: string
  creadoEn: string
}

export interface ActividadFormData {
  nombre: string
  fecha: string
  prioridad: Prioridad
  categoria: Categoria
  descripcion: string
}

export type FiltroEstado = 'todas' | 'pendientes' | 'completadas'

export type OrdenActividades =
  | 'fecha-asc'
  | 'fecha-desc'
  | 'prioridad'
  | 'nombre'
  | 'recientes'

export interface FiltrosActividad {
  busqueda: string
  prioridad: Prioridad | 'todas'
  categoria: Categoria | 'todas'
  estado: FiltroEstado
  orden: OrdenActividades
}

export interface EstadisticasActividad {
  total: number
  pendientes: number
  completadas: number
  altaPrioridad: number
  vencidas: number
  hoy: number
}

export const PRIORIDADES: Prioridad[] = ['Alta', 'Media', 'Baja']

export const CATEGORIAS: Categoria[] = [
  'General',
  'Estudio',
  'Trabajo',
  'Personal',
  'Proyecto',
]

export const PRIORIDAD_ORDEN: Record<Prioridad, number> = {
  Alta: 0,
  Media: 1,
  Baja: 2,
}

export const CATEGORIA_COLORES: Record<Categoria, string> = {
  General: 'bg-slate-500',
  Estudio: 'bg-blue-500',
  Trabajo: 'bg-amber-500',
  Personal: 'bg-emerald-500',
  Proyecto: 'bg-purple-500',
}
