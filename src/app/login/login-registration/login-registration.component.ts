import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Departamento } from 'src/app/shared/departamento.model';
import { Hotel } from '../../shared/hotel.model';
import { LoginCardComponent } from '../login-card/login-card.component';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {

  log!: LoginCardComponent;
  nombre!: string;
  private loginSub!: Subscription;
  private empSub!: Subscription;
  errorNombre!: boolean;
  nombreVacio!: boolean;
  hoteles!: Hotel[];
  password !: string;
  password2 !: string;
  errorPassword !: boolean;
  selectedHotel !: number;
  selectedDepartamento !: number
  departamentos!: Departamento[];
  errorInsercionEmpleado !: boolean;
  constructor(public loginService : LoginService, public router : Router) {
    this.log = new LoginCardComponent(loginService, router);
   }

  ngOnInit(): void {
    this.log.loginservice.getHoteles();
    this.loginSub = this.log.loginservice.getHotelUpdateListener()
    .subscribe((hoteles: Hotel[]) =>{
      this.hoteles = hoteles;
    })
    this.log.cambiaColor();
    setInterval(() => { this.log.cambiaColor(); },3000);
  }

  insertaEmpleado(){
    this.log.loginservice.insertaEmpleado({idDep : this.selectedDepartamento, nombre: this.nombre, password: this.password });
    this.empSub = this.log.loginservice.getEmpleadoUpdatedListener()
    .subscribe((message : boolean) =>{
      this.errorInsercionEmpleado = message;
      
    });
  }

  getDepartamentos(){
    this.log.loginservice.getDepartamentos({envio: this.selectedHotel});
    this.loginSub = this.log.loginservice.getDepartamentoUpdateListener()
    .subscribe((departamentos: Departamento[]) => {
      this.departamentos = departamentos;
    })
  }

  onSubmit(){
    this.nombreVacio = true;
    this.errorPassword = true;
    this.errorNombre = false;
    if(this.nombre !== undefined ){
      if(this.nombre.length > 0){
        this.nombreVacio = false;
        this.log.loginservice.sendLogin({envio : this.nombre});
        this.loginSub = this.log.loginservice.getLoginUpdatedListener()
        .subscribe((message : boolean) =>{
          this.errorNombre = message;
        })
      }
    }
    if(this.password !== undefined && this.password2 !== undefined){
      if(this.password.length > 0 && this.password2.length > 0){
        this.errorPassword = this.password == this.password2 ? false : true;
      }
    }
    if(!this.nombreVacio && !this.errorPassword && !this.errorNombre && this.selectedHotel != undefined && this.selectedDepartamento != undefined){
      alert("ok");
      this.insertaEmpleado();
      if(!this.errorInsercionEmpleado){
        this.router.navigate(['/home/main']);
      }
    }
   
    
  }

 
}


