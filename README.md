#  TP Angular 21 - Gestión de Inscripciones

**Autor:** Abel Nestor Peñaloza  
**Legajo:** 2613  
**Fecha:** 2026  
**Tecnologías:** Angular 21, Bootstrap 5, TypeScript, Reactive Forms

---

##  Descripción del proyecto

Aplicación web desarrollada en **Angular 21** para la gestión de inscripciones a cursos técnicos.  
Permite registrar alumnos, aplicar descuentos por categoría (estudiante, egresado, particular), editar y eliminar inscripciones, y visualizar resúmenes estadísticos.

### Funcionalidades principales

-  Formulario reactivo con validaciones en tiempo real
-  Cálculo automático de total con descuentos:
  -  **Estudiante:** 35% descuento
  -  **Egresado:** 50% descuento
  -  **Particular:** 0% descuento
-  CRUD completo de inscripciones (Create, Read, Update, Delete)
-  Tabla responsiva con botones de acción (Editar/Eliminar)
-  Resumen por categoría y total general recaudado
-  Layout responsive con Bootstrap 5
-  Footer consistente con la paleta de colores del header

---

##  Tecnologías utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Angular | 21 | Framework principal |
| Bootstrap | 5.3 | Estilos y componentes UI |
| TypeScript | 5.x | Lenguaje |
| Reactive Forms | - | Manejo de formularios |
| Angular Pipes | - | Formato de fechas y monedas |

---

##  Paleta de colores personalizada

```css
:root {
  --mi-gris: #dddddd;      /* Fondo general */
  --mi-azul: #4E61D3;      /* Header y footer */
  --mi-letra: #2C3947;     /* Texto principal */
  --mi-blanco: #ffffff;    /* Texto sobre fondos oscuros */
  --mi-acento: #57ebb6;    /* Hover y bordes decorativos */
}
## Estructura del Proyecto
src/app/
├── components/
│   ├── shared/                     ← Componentes reutilizables
│   │   ├── header/                 ← Header de navegación
│   │   └── footer/                 ← Footer institucional
│   ├── formulario-inscripcion/     ← Componente principal
│   ├── punto1/                     ← Slide personalizado
│   ├── punto2/                     ← Lista de productos
│   └── punto3/                     ← Juego de memoria
├── models/
│   └── inscripcion.ts              ← Interfaces y enums
├── services/
│   └── inscripcion.service.ts      ← CRUD y lógica de negocio
├── app.ts                          ← Componente raíz
├── app.routes.ts                   ← Configuración de rutas
└── app.css                         ← Estilos globales

