import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-punto2',  
  imports: [CommonModule],
  templateUrl: './punto2.html',
  styleUrl: './punto2.css',
})
export class Punto2 {
  // 1. Arreglo de productos con precios corregidos para cálculos
  productos = [
    { nombre: 'Vino Cactus', descripcion: 'Vino tinto con sabor a cactus, ideal para los amantes de lo exótico.', img: 'assets/prod-1.webp', precio: 15000 },
    { nombre: 'Vino Sikuri', descripcion: 'Vino blanco con sabor a frutas tropicales, perfecto para ocasiones especiales.', img: 'assets/prod-2.webp', precio: 12000 },
    { nombre: 'Vino Franc Dupont', descripcion: 'Vino tinto con sabor a frutas rojas, ideal para degustaciones.', img: 'assets/prod-3.webp', precio: 18000 },
    { nombre: 'Vino Hombre Jaguar', descripcion: 'Vino rosado con sabor a frutas cítricas, perfecto para compartir en familia.', img: 'assets/prod-4.webp', precio: 11000 },
    { nombre: 'Vino Punta Corral', descripcion: 'Vino tinto con sabor a especias, ideal para maridar con carnes.', img: 'assets/prod-5.webp', precio: 14000 },
    { nombre: 'Vino Runa', descripcion: 'Vino blanco con sabor a flores, perfecto para disfrutar en una tarde soleada.', img: 'assets/prod-6.webp', precio: 10000 }
  ];

  carrito: any[] = [];
  total: number = 0;
  compraRealizada: boolean = false;
  cantidadTotal: number = 0;

  // 3. Agregar al carrito gestionando cantidades
  agregarAlCarrito(producto: any) {
    this.compraRealizada = false; // Resetear estado de éxito si agrega algo nuevo
    const itemExiste = this.carrito.find(item => item.nombre === producto.nombre);

    if (itemExiste) {
      itemExiste.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    this.calcularTotal();
  }

  // 4. Métodos para los botones + y -
  incrementarCantidad(item: any) {
    item.cantidad++;
    this.calcularTotal();
  }

  decrementarCantidad(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.carrito = this.carrito.filter(i => i.nombre !== item.nombre);
    }
    this.calcularTotal();
  }

  // 5. Calcular total: Precio * Cantidad
  calcularTotal() {
    this.total = this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    this.cantidadTotal = this.carrito.reduce((sum, item) => sum + item.cantidad, 0);
  }

  finalizarCompra() {
    this.compraRealizada = true;
    this.carrito = [];
    this.total = 0;
    setTimeout(() => {
      this.compraRealizada = false;
    }, 4000);
  }
}