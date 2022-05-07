import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/shared/cliente.model';
import { MainService } from '../main.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {


  registroCliente: FormGroup;
  private cliSub!: Subscription;
  errorInsercionCliente !: boolean;
  constructor(private fb : FormBuilder, public mainService : MainService) { 
    this.registroCliente = this.fb.group({
      dni: ['',Validators.required],
      nombre: ['',Validators.required],
      apellido1: ['',Validators.required],
      apellido2: 'null'
    })
  }

  ngOnInit(): void {
  }

  insertaCliente(){
    let dni = (this.registroCliente.get('dni')?.value as unknown) as string;
    let nombre = (this.registroCliente.get('nombre')?.value as unknown) as string;
    let apellido1 = (this.registroCliente.get('apellido1')?.value as unknown) as string;
    let apellido2 = (this.registroCliente.get('apellido2')?.value as unknown) as string;
    this.mainService.insertaCliente({dni: dni,nombre : nombre,apellido1:apellido1, apellido2: apellido2});
    this.cliSub = this.mainService.getEmpleadoUpdatedListener()
    .subscribe((message : boolean) =>{
      this.errorInsercionCliente = !message;
      
    });
  }
  onSubmit(form: FormGroup){
    console.log(form.valid)
    if(form.valid){
  
      this.insertaCliente();
    }
  }

}
