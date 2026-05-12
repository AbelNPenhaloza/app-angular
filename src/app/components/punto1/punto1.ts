import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-punto1',
  imports: [CommonModule],
  templateUrl: './punto1.html',
  styleUrl: './punto1.css',
})
export class Punto1 {
  //1. Definicion del array de objetos solicitados
  eventos = [
    { nombre: 'Startup Tech',
      descripcion: 'Evento para emprendedores tecnológicos',
      img: 'assets/event-1.webp'
    },
    {nombre: 'Desarrollo de Apps',
      descripcion: 'Como empezar una Startup de desarrollo mobile',
      img: 'assets/event-2.webp'
    },
    { nombre: 'Tecnología en la Puna Jujeña',
      descripcion: 'Evento para emprendedores tecnológicos todo terreno',
      img: 'assets/event-3.webp'
    },
    { nombre: 'Club de Emprendedores Tech',
      descripcion: 'Evento para estudiantes de informática',
      img: 'assets/event-4.webp'
    }
  ];
  //2. Variable para controlar que evento se muestra.
  indiceActual: number = 0;
  //3. Metodo para avanzar (Slide)
  siguiente(){
    if(this.indiceActual < this.eventos.length - 1){
      this.indiceActual++;
    } else {
      this.indiceActual = 0; // Reinicia al primero.
    }
  }
  //4. Metodo para retroceder
  anterior(){
    if(this.indiceActual > 0){
      this.indiceActual--;
    } else {
      this.indiceActual = this.eventos.length - 1; // Va al último.
    }
  } 
  seleccionarSlide(indice: number){
    this.indiceActual = indice;
  }
}