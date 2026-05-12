import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaAlumno, Inscripcion } from '../../models/inscripcion';
import { InscripcionService } from '../../services/inscripcion.service';

@Component({
  selector: 'app-formulario-inscripcion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-inscripcion.html',
  styleUrl: './formulario-inscripcion.css',
})
export class FormularioInscripcion implements OnInit {
  formulario!: FormGroup;
  mostrarFormulario = true;
  modoEdicion = false;
  dniEdicion: string | null = null;
  totalCalculado: number | null = null;
  inscripciones: Inscripcion[] = [];
  resumen = { porCategoria: { '1': 0, '2': 0, '3': 0 }, totalGeneral: 0 };

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.actualizarListas();

    // Recalcular total al cambiar precio o categoría
    this.formulario.get('precio')?.valueChanges.subscribe(() => this.calcularTotal());
    this.formulario.get('categoriaAlumno')?.valueChanges.subscribe(() => this.calcularTotal());
  }

  // Configuración del formulario reactivo con validaciones
  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      curso: ['Angular 21', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      categoriaAlumno: ['1', Validators.required]
    });
  }

  // Calcula el total usando el servicio
  calcularTotal(): void {
    const precio = this.formulario.get('precio')?.value;
    const categoria = this.formulario.get('categoriaAlumno')?.value;

    if (precio && categoria) {
      this.totalCalculado = this.inscripcionService.calcularTotal(
        Number(precio),
        categoria as CategoriaAlumno
      );
    } else {
      this.totalCalculado = null;
    }
  }

  // CREATE o UPDATE según modoEdicion
  registrar(): void {
    if (this.formulario.valid && this.totalCalculado !== null) {
      const datosInscripcion = {
        dni: this.formulario.value.dni,
        email: this.formulario.value.email,
        curso: this.formulario.value.curso,
        precio: Number(this.formulario.value.precio),
        categoriaAlumno: this.formulario.value.categoriaAlumno as CategoriaAlumno
      };

      if (this.modoEdicion && this.dniEdicion) {
        this.inscripcionService.actualizacionInscripcion(this.dniEdicion, datosInscripcion);
        this.modoEdicion = false;
        this.dniEdicion = null;
      } else {
        this.inscripcionService.agregarInscripcion(datosInscripcion);
      }

      this.actualizarListas();
      this.resetearFormulario();
    }
  }

  // Refresca las listas desde el servicio
  actualizarListas(): void {
    this.inscripciones = this.inscripcionService.obtenerTodas();
    this.resumen = this.inscripcionService.obtenerResumen();
  }

  // Muestra/oculta el formulario
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.cancelarEdicion();
    }
  }

  // Carga datos en el formulario para editar
  prepararEdicion(inscripcion: Inscripcion): void {
    this.modoEdicion = true;
    this.dniEdicion = inscripcion.dni;
    this.mostrarFormulario = true;

    this.formulario.patchValue({
      dni: inscripcion.dni,
      email: inscripcion.email,
      curso: inscripcion.curso,
      precio: inscripcion.precio,
      categoriaAlumno: inscripcion.categoriaAlumno
    });

    this.calcularTotal();
  }

  // Elimina una inscripción con confirmación
  eliminarInscripcion(dni: string): void {
    if (confirm(`¿Eliminar la inscripción con DNI ${dni}?`)) {
      this.inscripcionService.eliminarInscripcion(dni);
      this.actualizarListas();

      if (this.modoEdicion && this.dniEdicion === dni) {
        this.cancelarEdicion();
      }
    }
  }

  // Cancela el modo edición y limpia el formulario
  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.dniEdicion = null;
    this.resetearFormulario();
  }

  // Limpia el formulario a valores por defecto
  private resetearFormulario(): void {
    this.formulario.reset({
      dni: '',
      email: '',
      curso: 'Angular 21',
      precio: '',
      categoriaAlumno: '1',
    });
    this.totalCalculado = null;
  }
}