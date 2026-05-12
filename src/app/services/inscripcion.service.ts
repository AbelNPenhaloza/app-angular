import { Injectable } from '@angular/core';
import { CategoriaAlumno, Curso, DESCUENTOS, Inscripcion } from '../models/inscripcion'; 

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private inscripciones: Inscripcion[] = [];

  constructor() {
    this.cargarDatosPrecargados();
  }

  // Carga inicial de datos (mínimo 3 registros)
  private cargarDatosPrecargados(): void {
    const datosPrecargados = [
      {
        dni: '12345678',
        email: 'juan.perez@email.com',
        curso: 'Angular 21' as Curso,
        precio: 500,
        categoriaAlumno: CategoriaAlumno.Estudiante
      },
      {
        dni: '87654321',
        email: 'maria.gomez@email.com',
        curso: 'Python & AI' as Curso,
        precio: 600,
        categoriaAlumno: CategoriaAlumno.Egresado
      },
      {
        dni: '45678912',
        email: 'carlos.lopez@email.com',
        curso: 'Backend con NodeJS' as Curso,
        precio: 550,
        categoriaAlumno: CategoriaAlumno.Particular
      }
    ];
    datosPrecargados.forEach(data => this.agregarInscripcion(data));
  }

  // CREATE
  agregarInscripcion(data: Omit<Inscripcion, 'fechaInscripcion' | 'totalPagar'>): void {
    const nuevaInscripcion: Inscripcion = {
      ...data,
      fechaInscripcion: new Date(),
      totalPagar: this.calcularTotal(data.precio, data.categoriaAlumno)
    };
    this.inscripciones.push(nuevaInscripcion);
  }

  // READ - todas
  obtenerTodas(): Inscripcion[] {
    return this.inscripciones;
  }

  // READ - por DNI
  obtenerPorDni(dni: string): Inscripcion | undefined {
    return this.inscripciones.find(inscripcion => inscripcion.dni === dni);
  }

  // READ - por categoría
  obtenerPorCategoria(categoria: CategoriaAlumno): Inscripcion[] {
    return this.inscripciones.filter(inscripcion => inscripcion.categoriaAlumno === categoria);
  }

  // UPDATE
  actualizacionInscripcion(dni: string, datosActualizados: Partial<Inscripcion>): boolean {
    const index = this.inscripciones.findIndex(inscripcion => inscripcion.dni === dni);
    if (index !== -1) {
      this.inscripciones[index] = { ...this.inscripciones[index], ...datosActualizados };
      // Recalcular total si cambió precio o categoría
      if (datosActualizados.precio !== undefined || datosActualizados.categoriaAlumno !== undefined) {
        const inscripcion = this.inscripciones[index];
        this.inscripciones[index].totalPagar = this.calcularTotal(
          inscripcion.precio,
          inscripcion.categoriaAlumno
        );
      }
      return true;
    }
    return false;
  }

  // DELETE
  eliminarInscripcion(dni: string): boolean {
    const index = this.inscripciones.findIndex(inscripcion => inscripcion.dni === dni);
    if (index !== -1) {
      this.inscripciones.splice(index, 1);
      return true;
    }
    return false;
  }

  // Lógica de negocio: cálculo con descuento
  calcularTotal(precio: number, categoria: CategoriaAlumno): number {
    const descuento = DESCUENTOS[categoria] || 0;
    return precio * (1 - descuento);
  }

  // Resumen para el dashboard
  obtenerResumen() {
    const porCategoria = {
      [CategoriaAlumno.Estudiante]: 0,
      [CategoriaAlumno.Egresado]: 0,
      [CategoriaAlumno.Particular]: 0
    };

    let totalGeneral = 0;
    for (const inscripcion of this.inscripciones) {
      porCategoria[inscripcion.categoriaAlumno]++;
      totalGeneral += inscripcion.totalPagar;
    }
    return { porCategoria, totalGeneral };
  }
}