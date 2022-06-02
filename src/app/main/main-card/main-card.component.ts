import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { VistaClientesComponent } from '../vista-clientes/vista-clientes.component';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.css'],
})
export class MainCardComponent implements OnInit {
  constructor(public loginService: LoginService, public router: Router) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('id'));
  }

  ngOnChanges(): void {}
}
