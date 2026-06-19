# Actividades v2.0

Sistema moderno de control y seguimiento de actividades, desarrollado como proyecto educativo.

## Características

- Registro, edición y eliminación de actividades
- Prioridades (Alta, Media, Baja) y categorías
- Marcar actividades como completadas
- Panel de estadísticas en tiempo real
- Búsqueda, filtros y ordenamiento
- Persistencia automática en localStorage
- Exportación a JSON y CSV
- Modo claro / oscuro
- Diseño responsive (móvil, tablet, escritorio)

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| Vue 3 | Framework frontend (Composition API) |
| TypeScript | Tipado estático |
| Vite 6 | Build tool y dev server |
| Tailwind CSS | Estilos utility-first |
| Pinia | Gestión de estado |
| date-fns | Manejo de fechas |
| Lucide Vue | Iconos |
| SweetAlert2 | Notificaciones |

## Estructura del proyecto

```
src/
├── components/
│   ├── actividades/     # Componentes de la funcionalidad principal
│   └── layout/          # Header y layout
├── composables/         # Lógica reutilizable (tema, etc.)
├── stores/              # Estado global con Pinia
├── types/               # Interfaces TypeScript
├── utils/               # Utilidades (fechas, exportación)
├── App.vue              # Componente raíz
└── main.ts              # Punto de entrada
```

## Instalación

```bash
npm install
npm run dev
```


## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm run preview` | Vista previa del build |

