export enum CategoriaAlumno {
    Estudiante = '1',
    Egresado = '2',
    Particular = '3'
}

// Creamos un mapeo de descuentos asociado a la categoría
export const DESCUENTOS = {
  [CategoriaAlumno.Estudiante]: 0.35, // 35%
  [CategoriaAlumno.Egresado]: 0.50,    // 50%
  [CategoriaAlumno.Particular]: 0      // Sin descuento
};

export enum Curso {
  Angular = 'Angular 21',
  Python = 'Python & AI',
  N8N = 'Automatización con n8n',
  Java = 'Backend con Java',
  NodeJS = 'Backend con NodeJS'
}
export interface Inscripcion {
    dni: string;
    precio: number;
    categoriaAlumno: CategoriaAlumno;
    fechaInscripcion: Date;
    email: string;
    curso: Curso;
    totalPagar: number;
}
