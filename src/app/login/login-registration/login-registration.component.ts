import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Empleado } from 'src/app/shared/empleado.model';
import { Departamento } from '../../shared/departamento.model';
import { Hotel } from '../../shared/hotel.model';
import { LoginCardComponent } from '../login-card/login-card.component';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css'],
})
export class LoginRegistrationComponent implements OnInit, OnDestroy{
  log!: LoginCardComponent;
  nombre!: string;
  private loginSub!: Subscription;
  private empSub!: Subscription;
  errorNombre!: boolean;
  nombreVacio!: boolean;
  errorHotel!: boolean;
  errorDepartamento!: boolean;
  hoteles!: Hotel[];
  password!: string;
  password2!: string;
  errorPassword!: boolean;
  selectedHotel!: number;
  selectedDepartamento!: number;
  departamentos!: Departamento[];
  empleado: Empleado = {
    id: -1,
    id_departamento: -1,
    rango: 0,
    login: '',
    color: 4,
    hotel: '',
  };
  errorInsercionEmpleado!: boolean;
  constructor(public loginService: LoginService, public router: Router) {
    this.log = new LoginCardComponent(loginService, router);
  }
 

  ngOnInit(): void {
    this.log.loginservice.getHoteles();
    this.loginSub = this.log.loginservice
      .getHotelUpdateListener()
      .subscribe((hoteles: Hotel[]) => {
        this.hoteles = hoteles;
      });
    this.log.cambiaColor();
    setInterval(() => {
      this.log.cambiaColor();
    }, 3000);
  }

  insertaEmpleado() {
    this.log.loginservice.insertaEmpleado({
      id_departamento: this.selectedDepartamento,
      nombre: this.nombre,
      password: this.password,
    });
    this.empSub = this.log.loginservice
      .getEmpleadoUpdatedListener()
      .subscribe((message: any) => {
        this.errorInsercionEmpleado = message;
        if (message) {
          this.empleado.id = Number(message);
          this.empleado.id_departamento = this.selectedDepartamento;
          this.empleado.rango = 0;
          this.empleado.login = this.nombre;
          console.log(this.empleado.id);
          localStorage.setItem('rango', String(this.empleado.rango));
          localStorage.setItem('id', String(this.empleado.id));
          localStorage.setItem('color', String(this.empleado.color));
        }
      });
  }

  getDepartamentos() {
    this.log.loginservice.getDepartamentos({ envio: this.selectedHotel });
    this.loginSub = this.log.loginservice
      .getDepartamentoUpdateListener()
      .subscribe((departamentos: Departamento[]) => {
        this.departamentos = departamentos;
      });
  }
  mandarNombre() {
    if (this.nombre !== undefined) {
      if (this.nombre.length > 0) {
        this.nombreVacio = false;
        this.log.loginservice.sendLogin({ envio: this.nombre });
        this.loginSub = this.log.loginservice
          .getLoginUpdatedListener()
          .subscribe((message: boolean) => {
            this.errorNombre = message;
          });
      }
    }
  }
  mandarPassword() {
    if (this.password !== undefined && this.password2 !== undefined) {
      if (this.password.length > 0 && this.password2.length > 0) {
        this.errorPassword = this.password == this.password2 ? false : true;
      }
    }
  }
  redireccionar() {
    this.errorHotel = this.selectedHotel === undefined ? true : false;
    this.errorDepartamento =
      this.selectedDepartamento === undefined ? true : false;

    // alert("dentro funcion submit nombre vacio " + this.nombreVacio + " error password " + this.errorPassword  + " error nombre " + this.errorNombre + " error hotel " + this.errorHotel + " error departamento " + this.errorDepartamento);
    if (
      this.nombreVacio === false &&
      this.errorPassword === false &&
      this.errorNombre === false &&
      this.errorHotel === false &&
      this.errorDepartamento === false
    ) {
      // alert("dentro comprobaciones submit nombre vacio " + this.nombreVacio + " error password " + this.errorPassword  + " error nombre " + this.errorNombre + " error hotel " + this.errorHotel + " error departamento " + this.errorDepartamento);
      this.insertaEmpleado();
      this.loginService.data = this.empleado;

      this.router.navigate(['/home/main']);
      // alert("error insercion empleado " + this.errorInsercionEmpleado);
      // if(this.errorInsercionEmpleado === false){

      // }
    }
  }

  onSubmit() {
    this.mandarNombre();
    this.mandarPassword();

    setTimeout(() => {
      this.redireccionar();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
    this.empSub.unsubscribe();
  }
}
