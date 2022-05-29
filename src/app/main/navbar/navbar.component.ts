import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuItems!: Array<{ nombre: string; link: string }>;
  theme: string;

  constructor(public router: Router) {
    this.theme = 'green-theme';
  }

  ngOnInit(): void {
    this.menuItems = [
      { nombre: 'Ver opiniones', link: 'home/main' },
      { nombre: 'Test de personalidad', link: 'home/test' },
      { nombre: 'Menu administrador', link: 'home/admin' },
    ];
    console.log(localStorage.getItem('rango'));
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
