import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/shared/cliente.model';
import { MainService } from '../main.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css'],
})
export class RegistroClienteComponent implements OnInit, OnDestroy {
  registroCliente: FormGroup;
  private cliSub!: Subscription;
  private dniSub!: Subscription;
  errorInsercionCliente!: boolean;
  ExisteDni!: boolean;
  theme: string = '';
  themes!: string[];
  indiceColor = 4;
  constructor(private fb: FormBuilder, public mainService: MainService) {
    this.registroCliente = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: '',
    });
  }

  ngOnInit(): void {
    console.log(this.registroCliente);
    this.themes = ['red-theme', 'green-theme', 'blue-theme', 'yellow-theme'];
    this.indiceColor = localStorage.getItem('color') as unknown as number;
    console.log('indice color : ' + this.indiceColor);
    if (this.indiceColor < 4) {
      this.theme = this.themes[this.indiceColor];
    }
  }

  insertaCliente() {
    let dni = this.registroCliente.get('dni')?.value as unknown as string;
    let nombre = this.registroCliente.get('nombre')?.value as unknown as string;
    let apellido1 = this.registroCliente.get('apellido1')
      ?.value as unknown as string;
    let apellido2 = this.registroCliente.get('apellido2')
      ?.value as unknown as string;
    this.mainService.insertaCliente({
      dni: dni,
      nombre: nombre,
      apellido1: apellido1,
      apellido2: apellido2,
    });
    this.cliSub = this.mainService
      .getEmpleadoUpdatedListener()
      .subscribe((message: boolean) => {
        this.errorInsercionCliente = !message;
        if (message) {
          alert('Cliente registrado correctamente');
          window.location.reload();
        }
      });
  }

  comprobarDni() {
    let dni = this.registroCliente.get('dni')?.value as unknown as string;
    this.mainService.compruebaDni({ envio: dni });
    this.dniSub = this.mainService
      .getDniUpdatedListener()
      .subscribe((message: boolean) => {
        this.ExisteDni = message;
      });
  }
  onSubmit(form: FormGroup) {
    console.log(form.valid);
    this.comprobarDni();
    setTimeout(() => {
      if (form.valid && !this.ExisteDni) {
        this.insertaCliente();
      }
    }, 1000);
  }
  ngOnDestroy(): void {
    if (this.cliSub !== undefined) {
      this.cliSub.unsubscribe();
    }
    if (this.dniSub !== undefined) {
      this.dniSub.unsubscribe();
    }
  }
}
