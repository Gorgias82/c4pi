import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuItems!: Array<{ nombre: string; link: string }>;
  theme: string = '';
  fuente: string = 'black';
  themes!: string[];
  fuentes!: string[];
  indiceColor!: number;
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.themes = ['red-theme', 'green-theme', 'blue-theme', 'yellow-theme'];
    this.fuentes = ['rojo', 'verde', 'azul', 'amarillo'];
    this.indiceColor = localStorage.getItem('color') as unknown as number;
    console.log('indice color : ' + this.indiceColor);
    if (this.indiceColor < 4) {
      this.fuente = this.fuentes[this.indiceColor];
      this.theme = this.themes[this.indiceColor];
    }
    console.log(this.fuente);
    this.menuItems = [
      { nombre: 'Ver opiniones', link: 'home/main' },
      { nombre: 'Test de personalidad', link: 'home/test' },
      { nombre: 'Menu administrador', link: 'home/admin' },
    ];
    if (localStorage.getItem('rango') !== '1') {
      this.menuItems.pop();
    }
  }
  onLink(e: string) {
    if (e === 'home/login') {
      localStorage.clear();
    }
    this.router.navigate([e]);
  }
}
