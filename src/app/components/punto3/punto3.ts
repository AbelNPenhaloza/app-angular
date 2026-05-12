import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Carta } from '../../models/carta';

@Component({
  selector: 'app-punto3',
  imports: [CommonModule],
  templateUrl: './punto3.html',
  styleUrl: './punto3.css',
})
export class Punto3 {
  //1. Configuracion de iconos (6 parejas = 12 cartas)
  iconosBase: string[] = [
    'bi-airplane-fill', 'bi-alarm-fill', 'bi-star-fill',
    'bi-bandaid-fill', 'bi-bicycle', 'bi-camera-fill'
  ];
  tablero: Carta[] = [];
  intentos: number = 0;
  maxIntentos: number = 5;
  enJuego: boolean = true;
  bloquearTablero: boolean = false;
  cartasSeleccionadas: Carta[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.prepararTablero();
  }
  // Prepara el tablero mezclando las cartas
  prepararTablero() {
    this.enJuego = false;
    this.intentos = this.maxIntentos;
    this.cartasSeleccionadas = [];
    this.bloquearTablero = false;

    // Duplicamos los iconos para tener 12 elementos y los mezclamos
    const listaIconos = [...this.iconosBase, ...this.iconosBase];

    //Algoritmo de mezcla (Fisher-Yates)
    for (let i = listaIconos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [listaIconos[i], listaIconos[j]] = [listaIconos[j], listaIconos[i]];
    }
    // Transformamos string en objetos Carta
    this.tablero = listaIconos.map((icono, index) => ({
      id: index,
      icono: icono,
      estado: 'tapada',
    }));

  }

  iniciarJuego() {
    this.enJuego = true;
  }

  reiniciarJuego() {
    this.prepararTablero();
    this.enJuego = true;
  }

  revelarCarta(carta: Carta) {
    //VAlidacione de seguridad
    if (!this.enJuego || this.bloquearTablero || carta.estado !== 'tapada') return;
    //Volteamos la carta 
    carta.estado = 'volteada';
    this.cartasSeleccionadas.push(carta);
    // Si hay 2 cartas seleccionadas, comparamos
    if (this.cartasSeleccionadas.length === 2) {
      this.compararParejas();
    }
  }
  compararParejas() {
    this.bloquearTablero = true;
    const [carta1, carta2] = this.cartasSeleccionadas;
    if (carta1.icono === carta2.icono) {
      // Pareja encontrada
      carta1.estado = 'encontrada';
      carta2.estado = 'encontrada';
      this.cartasSeleccionadas = [];
      this.bloquearTablero = false;
      this.verificarVictoria();
    } else {
      // Restamos el intento
      this.intentos--;
      // Fallo: Esperamos 1 segundo para que el usuario las vea y las tapamos
      setTimeout(() => {
        carta1.estado = 'tapada';
        carta2.estado = 'tapada';
        this.cartasSeleccionadas = [];
        this.bloquearTablero = false;
        this.verificarDerrota();


      }, 1000);
    }
  }
  verificarVictoria() {
    const todasEncontradas = this.tablero.every(c => c.estado === 'encontrada');
    if (todasEncontradas) {
      this.enJuego = false;
      setTimeout(() => {
        alert('¡Felicidades! Has encontrado todas las parejas.');
      }, 800);
    }
  }

  verificarDerrota() {
    if (this.intentos === 0) {
      this.enJuego = false;
      this.bloquearTablero = true;

      this.tablero.forEach(c => c.estado = 'volteada');
      this.cdr.detectChanges(); // Forzamos la actualización para mostrar las cartas volteadas

      setTimeout(() => {
        alert('Se acabaron los intentos. ¡Has perdido!. Intenta de nuevo.');
      }, 100);
    }
  }
}
