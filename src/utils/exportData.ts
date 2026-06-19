import type { Actividad } from '@/types/activity'
import { formatearFechaCorta } from '@/utils/dates'

export function exportarJSON(actividades: Actividad[]): void {
  const data = JSON.stringify(actividades, null, 2)
  descargarArchivo(data, 'actividades.json', 'application/json')
}

export function exportarCSV(actividades: Actividad[]): void {
  const encabezados = [
    'Nombre',
    'Fecha',
    'Prioridad',
    'Categoría',
    'Estado',
    'Descripción',
  ]

  const filas = actividades.map((a) =>
    [
      escaparCSV(a.nombre),
      formatearFechaCorta(a.fecha),
      a.prioridad,
      a.categoria,
      a.estado === 'completada' ? 'Completada' : 'Pendiente',
      escaparCSV(a.descripcion ?? ''),
    ].join(',')
  )

  const csv = [encabezados.join(','), ...filas].join('\n')
  descargarArchivo(csv, 'actividades.csv', 'text/csv;charset=utf-8;')
}

function escaparCSV(valor: string): string {
  if (valor.includes(',') || valor.includes('"') || valor.includes('\n')) {
    return `"${valor.replace(/"/g, '""')}"`
  }
  return valor
}

function descargarArchivo(contenido: string, nombre: string, tipo: string): void {
  const blob = new Blob([contenido], { type: tipo })
  const url = URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = nombre
  enlace.click()
  URL.revokeObjectURL(url)
}

export function generarId(): string {
  return crypto.randomUUID()
}
