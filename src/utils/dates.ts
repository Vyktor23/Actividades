import { format, parseISO, isBefore, isToday, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatearFecha(fecha: string): string {
  return format(parseISO(fecha), "d 'de' MMMM, yyyy", { locale: es })
}

export function formatearFechaCorta(fecha: string): string {
  return format(parseISO(fecha), 'dd/MM/yyyy')
}

export function esFechaPasada(fecha: string): boolean {
  const fechaActividad = startOfDay(parseISO(fecha))
  const hoy = startOfDay(new Date())
  return isBefore(fechaActividad, hoy)
}

export function esFechaHoy(fecha: string): boolean {
  return isToday(parseISO(fecha))
}

export function obtenerFechaMinima(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

export type EstadoFecha = 'vencida' | 'hoy' | 'proxima'

export function obtenerEstadoFecha(fecha: string, completada: boolean): EstadoFecha {
  if (completada) return 'proxima'
  if (esFechaHoy(fecha)) return 'hoy'
  if (esFechaPasada(fecha)) return 'vencida'
  return 'proxima'
}

export const ESTADO_FECHA_ETIQUETAS: Record<EstadoFecha, string> = {
  vencida: 'Vencida',
  hoy: 'Hoy',
  proxima: 'Próxima',
}

export const ESTADO_FECHA_COLORES: Record<EstadoFecha, string> = {
  vencida: 'text-red-600 dark:text-red-400',
  hoy: 'text-amber-600 dark:text-amber-400',
  proxima: 'text-emerald-600 dark:text-emerald-400',
}
