import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems : Array<string> = ['Ver opiniones', 'Inserta una opinión','Test de personalidad','Menu administrador'];
  theme : string;
  constructor() { 
    this.theme = "green-theme";
  }

  ngOnInit(): void {
  }

}
