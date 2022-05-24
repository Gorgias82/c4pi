import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { stringify } from 'querystring';
import { Subject } from 'rxjs';
import { Cliente } from '../shared/cliente.model';
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

  constructor(private http: HttpClient) {}

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

  getOpiniones() {
    this.http
      .get<Opinion[]>('http://localhost:3000/opiniones')
      .subscribe((response: Opinion[]) => {
        this.respuestaOpiniones = response;
        this.OpinionesUpdated.next(this.respuestaOpiniones);
      });
  }

  getClientes() {
    this.http
      .get<Cliente[]>('http://localhost:3000/clientes')
      .subscribe((response: Cliente[]) => {
        this.respuestaClientes = response;
        this.ClientesUpdated.next(this.respuestaClientes);
      });
  }

  setOpinion(opinion: Opinion) {
    this.http
      .post<number>('http://localhost:3000/insertaOpinion', opinion)
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
      .post<boolean>('http://localhost:3000/insercion_cliente', cliente)
      .subscribe((responseData: boolean) => {
        this.respuestaCliente = responseData;
        this.clienteUpdated.next(this.respuestaCliente);
      });
  }

  compruebaDni(dni: { envio: string }) {
    this.http
      .post<boolean>('http://localhost:3000/comprobacion_dni', dni)
      .subscribe((responseData: boolean) => {
        this.respuestaDni = responseData;
        this.dniUpdated.next(this.respuestaDni);
      });
  }
}
