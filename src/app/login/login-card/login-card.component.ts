import { ThisReceiver } from '@angular/compiler';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, throwIfEmpty } from 'rxjs';
import { Empleado } from 'src/app/shared/empleado.model';
import { Hotel } from '../../shared/hotel.model';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css'],
})
export class LoginCardComponent implements OnInit {
  fuente!: string;
  fuentes!: Array<string>;
  theme!: string;
  themes!: Array<string>;
  color: string;
  colores: Array<string>;
  palabrasTotales: Array<Array<string>>;
  palabrasColor!: Array<string>;
  visibilidad!: string;
  nombre!: string;
  private loginSub!: Subscription;
  private passwordSub!: Subscription;
  private EmpleadoSub!: Subscription;
  errorNombre!: boolean;
  hoteles!: Hotel[];
  password!: string;
  errorPassword!: boolean;
  empleado!: Empleado;
  constructor(public loginservice: LoginService, public router: Router) {
    this.color = '#FFFFFF';
    this.colores = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
    this.palabrasTotales = [
      [
        'Energéticos',
        'Autoritarios',
        'Valientes',
        'Ambiciosos',
        'Pasionales',
        'Realistas',
      ],
      [
        'Creativos',
        'Constantes',
        'Pacientes',
        'Empáticos',
        'Espirituales',
        'Democráticos',
      ],
      [
        'Reflexivos',
        'Analíticos',
        'Tecnológicos',
        'Realistas',
        'Tranquilos',
        'Solitarios',
      ],
      [
        'Sociales',
        'Comunicativos',
        'Participativos',
        'Imprevisibles',
        'Intelectuales',
        'Criticos',
      ],
    ];
    this.themes = ['red-theme', 'green-theme', 'blue-theme', 'yellow-theme'];
    this.fuentes = ['rojo', 'verde', 'azul', 'amarillo'];
  }

  ngOnInit() {
    this.loginservice.getHoteles();
    this.loginSub = this.loginservice
      .getHotelUpdateListener()
      .subscribe((hoteles: Hotel[]) => {
        this.hoteles = hoteles;
      });
    this.cambiaColor();
    setInterval(() => {
      this.cambiaColor();
    }, 3000);
  }

  public cambiaColor(): void {
    let n = Math.floor(Math.random() * this.colores.length);
    this.color = this.colores[n];
    this.palabrasColor = this.palabrasTotales[n];
    this.theme = this.themes[n];
    this.fuente = this.fuentes[n];
  }

  public getNombre(): string {
    return this.nombre;
  }

  mandarNombre() {
    this.loginservice.sendLogin({ envio: this.nombre });
    this.loginSub = this.loginservice
      .getLoginUpdatedListener()
      .subscribe((message: boolean) => {
        this.errorNombre = !message;
      });
  }
  mandarPassword() {
    this.loginservice.sendPassword({
      nombre: this.nombre,
      password: this.password,
    });
    this.passwordSub = this.loginservice
      .getPasswordUpdatedListener()
      .subscribe((message: boolean) => {
        this.errorPassword = !message;
        if (message) {
          this.loginservice.getEmpleado({ nombre: this.nombre });
          this.EmpleadoSub = this.loginservice
            .getEmpleadoLoginUpdatedListener()
            .subscribe((emp: Empleado) => {
              this.empleado = emp;
            });
        }
      });
  }

  onSubmit() {
    this.mandarNombre();
    if (!this.errorNombre) {
      this.mandarPassword();
    }

    setTimeout(() => {
      this.redireccionar();
    }, 1000);
  }
  redireccionar() {
    if (this.errorNombre === false && this.errorPassword === false) {
      this.loginservice.data = this.empleado;
      localStorage.setItem('id', String(this.empleado.id));
      localStorage.setItem('rango', String(this.empleado.rango));
      this.router.navigate(['/home/main']);
    }
  }
}
