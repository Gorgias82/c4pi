import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from '../shared/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private respuestaCliente!: boolean;
  clienteUpdated = new Subject<boolean>();
  private respuestaDni!: boolean;
  dniUpdated = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  getDniUpdatedListener() {
    return this.dniUpdated.asObservable();
  }
  getEmpleadoUpdatedListener() {
    return this.clienteUpdated.asObservable();
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
