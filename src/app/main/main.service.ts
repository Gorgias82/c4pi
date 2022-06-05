import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { stringify } from 'querystring';
import { Subject } from 'rxjs';
import { Cliente } from '../shared/cliente.model';
import { Empleado } from '../shared/empleado.model';
import { Opinion } from '../shared/opinion.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private respuestaCliente!: boolean;
  clienteUpdated = new Subject<boolean>();
  private respuestaDni!: boolean;
  private respuestaOpinion!: number;
  dniUpdated = new Subject<boolean>();
  private respuestaClientes!: Cliente[];
  ClientesUpdated = new Subject<Cliente[]>();
  private respuestaOpiniones!: Opinion[];
  OpinionesUpdated = new Subject<Opinion[]>();
  OpinionUpdated = new Subject<number>();
  setColorUpdated = new Subject<boolean>();
  deleteEmpleadoUpdated = new Subject<boolean>();
  private respuestaSetColorEmpleado!: boolean;
  private respuestaDeleteEmpleado!: boolean;

  private respuestaEmpleados: Empleado[] = [];
  empleadosUpdated = new Subject<Empleado[]>();

  constructor(private http: HttpClient) {}

  getSetColorUpdatedListener() {
    return this.setColorUpdated.asObservable();
  }
  getDeleteEmpleadoUpdatedListener() {
    return this.deleteEmpleadoUpdated.asObservable();
  }
  getEmpleadosUpdatedListener() {
    return this.empleadosUpdated.asObservable();
  }

  getOpinionUpdatedListener() {
    return this.OpinionUpdated.asObservable();
  }

  getOpinionesUpdatedListener() {
    return this.OpinionesUpdated.asObservable();
  }

  getClientesUpdatedListener() {
    return this.ClientesUpdated.asObservable();
  }

  getDniUpdatedListener() {
    return this.dniUpdated.asObservable();
  }
  getEmpleadoUpdatedListener() {
    return this.clienteUpdated.asObservable();
  }

  setColorEmpleado(datos: { id: number; color: number }) {
    this.http
      .post<boolean>('http://localhost:3000/empleado/setColorEmpleado', datos)
      .subscribe((response: boolean) => {
        this.respuestaSetColorEmpleado = response;
        this.setColorUpdated.next(this.respuestaSetColorEmpleado);
      });
  }
  deleteEmpleado(datos: { id: number }) {
    this.http
      .post<boolean>('http://localhost:3000/empleado/deleteEmpleado', datos)
      .subscribe((response: boolean) => {
        this.respuestaDeleteEmpleado = response;
        this.deleteEmpleadoUpdated.next(this.respuestaDeleteEmpleado);
      });
  }

  getEmpleados(id: { id: number }) {
    this.http
      .post<Empleado[]>('http://localhost:3000/empleado/empleados', id)
      .subscribe((response: Empleado[]) => {
        this.respuestaEmpleados = response;
        this.empleadosUpdated.next(this.respuestaEmpleados);
      });
  }

  getOpiniones() {
    this.http
      .get<Opinion[]>('http://localhost:3000/opinion/opiniones')
      .subscribe((response: Opinion[]) => {
        this.respuestaOpiniones = response;
        this.OpinionesUpdated.next(this.respuestaOpiniones);
      });
  }

  getClientes() {
    this.http
      .get<Cliente[]>('http://localhost:3000/cliente/clientes')
      .subscribe((response: Cliente[]) => {
        this.respuestaClientes = response;
        this.ClientesUpdated.next(this.respuestaClientes);
      });
  }

  setOpinion(opinion: Opinion) {
    this.http
      .post<number>('http://localhost:3000/opinion/insertaOpinion', opinion)
      .subscribe((response: number) => {
        this.respuestaOpinion = response;
        this.OpinionUpdated.next(this.respuestaOpinion);
      });
  }

  insertaCliente(cliente: {
    dni: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
  }) {
    this.http
      .post<boolean>('http://localhost:3000/cliente/insercion_cliente', cliente)
      .subscribe((responseData: boolean) => {
        this.respuestaCliente = responseData;
        this.clienteUpdated.next(this.respuestaCliente);
      });
  }

  compruebaDni(dni: { envio: string }) {
    this.http
      .post<boolean>('http://localhost:3000/cliente/comprobacion_dni', dni)
      .subscribe((responseData: boolean) => {
        this.respuestaDni = responseData;
        this.dniUpdated.next(this.respuestaDni);
      });
  }
}
