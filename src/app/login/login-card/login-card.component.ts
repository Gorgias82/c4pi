import { Component, Injectable,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, throwIfEmpty } from 'rxjs';
import { Hotel } from '../../shared/hotel.model';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})

export class LoginCardComponent implements OnInit {

  color: string;
  colores: Array<string>;
  nombre!: string;
  private loginSub!: Subscription;
  private passwordSub !: Subscription;
  errorNombre!: boolean;
  hoteles!: Hotel[];
  password !: string;
  errorPassword !: boolean;
  constructor(public loginservice : LoginService, public router : Router) { 
    this.color = "#FFFFFF";
    this.colores = ["#FF0000","#00FF00","#0000FF","#FFFF00"];
    
  }

  ngOnInit() {
       this.loginservice.getHoteles();
    this.loginSub = this.loginservice.getHotelUpdateListener()
    .subscribe((hoteles: Hotel[]) =>{
      this.hoteles = hoteles;
    })
   this.cambiaColor();
   setInterval(() => { this.cambiaColor(); },3000);
  }


  public cambiaColor() : void{
    let n =  Math.floor((Math.random() * 4));
    this.color = this.colores[n];
  }

  public getNombre() : string{
    return this.nombre;
  }

   mandarNombre(){
    this.loginservice.sendLogin({envio : this.nombre});
    this.loginSub = this.loginservice.getLoginUpdatedListener()
    .subscribe((message : boolean) =>{
      alert("respuesta de bd nombre " + message);
      
      this.errorNombre = !message;
    
    })
  }
   mandarPassword(){
    this.loginservice.sendPassword({nombre: this.nombre, password : this.password});
    this.passwordSub = this.loginservice.getPasswordUpdatedListener()
    .subscribe((message : boolean) =>{
      alert("respuesta de bd password " + message);
      this.errorPassword = !message;
      
    })
  }

 async onSubmit(){
    this.mandarNombre();
    if(!this.errorNombre){   
     this.mandarPassword();
    }
  
    setTimeout(() => { this.redireccionar(); },1000);
    

  }
 redireccionar(){
  //  alert("redireccionar error nombre " + this.errorNombre + " error password " + this.errorPassword);
     if(this.errorNombre === false && this.errorPassword === false){
      alert("funcion nombre dentro comprobacion " + this.errorNombre + " password " + this.errorPassword);
      this.loginservice.data = this.nombre;
      this.router.navigate(['/home/main']);
    
     }
  }

}
