import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  //Datos institucionales
  anioActual = new Date().getFullYear();
  nombreAlumno = 'Abel Nestor Peñaloza';
  nombreApp = 'Practica Angular 21';
  trabajoPractico = 'Aplicación de Tecnologia SPA';
}
