import { Routes } from '@angular/router';
import { Punto1 } from './components/punto1/punto1';
import { Punto2 } from './components/punto2/punto2';
import { Punto3 } from './components/punto3/punto3';
import { FormularioInscripcion } from './components/formulario-inscripcion/formulario-inscripcion';

export const routes: Routes = [
    {path: 'punto1', component: Punto1},
    {path: 'punto2', component: Punto2},
    {path: 'punto3', component: Punto3},
    {path: 'formulario', component: FormularioInscripcion},
    {path: '', redirectTo: '/punto1', pathMatch: 'full' }// Ruta por defecto
];
