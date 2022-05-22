import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../shared/hotel.model';
import { Departamento } from '../shared/departamento.model';
import { Empleado } from '../shared/empleado.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private nombre!: string;
  private empleado!: Empleado;
  private departamentos!: Departamento[];
  private DepartamentoUpdated = new Subject<Departamento[]>();
  private hoteles!: Hotel[];
  private hotelUpdated = new Subject<Hotel[]>();
  private passwordUpdated = new Subject<boolean>();
  private loginUpdated = new Subject<boolean>();
  private empleadoUpdated = new Subject<boolean>();
  private empleadoLoginUpdated = new Subject<Empleado>();
  private respuestaNombre!: boolean;
  private respuestaPassword!: boolean;
  private respuestaEmpleado!: boolean;
  constructor(private http: HttpClient) {}

  get data(): Empleado {
    return this.empleado;
  }
  set data(val: Empleado) {
    this.empleado = val;
  }

  getEmpleado(nombre: { nombre: string }) {
    this.http
      .post<Empleado>('http://localhost:3000/getEmpleado', nombre)
      .subscribe((empData) => {
        this.empleado = empData;
        this.empleadoLoginUpdated.next(this.empleado);
      });
  }

  getHoteles() {
    this.http
      .get<Hotel[]>('http://localhost:3000/hoteles')
      .subscribe((hotelData) => {
        this.hoteles = hotelData;
        this.hotelUpdated.next(this.hoteles);
      });
  }
  getDepartamentos(idHotel: { envio: number }) {
    this.http
      .post<Departamento[]>('http://localhost:3000/departamentos', idHotel)
      .subscribe((depData) => {
        this.departamentos = depData;
        this.DepartamentoUpdated.next(this.departamentos);
      });
  }

  getEmpleadoLoginUpdatedListener() {
    return this.empleadoLoginUpdated.asObservable();
  }

  getEmpleadoUpdatedListener() {
    return this.empleadoUpdated.asObservable();
  }
  getDepartamentoUpdateListener() {
    return this.DepartamentoUpdated.asObservable();
  }

  getHotelUpdateListener() {
    return this.hotelUpdated.asObservable();
  }

  getLoginUpdatedListener() {
    return this.loginUpdated.asObservable();
  }
  getPasswordUpdatedListener() {
    return this.passwordUpdated.asObservable();
  }
  sendLogin(login: { envio: string }) {
    this.http
      .post<boolean>('http://localhost:3000/comprobacion_nombre', login)
      .subscribe((responseData: boolean) => {
        this.respuestaNombre = responseData;
        this.loginUpdated.next(this.respuestaNombre);
      });
  }

  sendPassword(password: { nombre: string; password: string }) {
    this.http
      .post<boolean>('http://localhost:3000/comprobacion_password', password)
      .subscribe((responseData: boolean) => {
        this.respuestaPassword = responseData;
        this.passwordUpdated.next(this.respuestaPassword);
      });
  }

  insertaEmpleado(empleado: {
    id_departamento: number;
    nombre: string;
    password: string;
  }) {
    this.http
      .post<boolean>('http://localhost:3000/insercion_empleado', empleado)
      .subscribe((responseData: boolean) => {
        this.respuestaEmpleado = responseData;
        this.empleadoUpdated.next(this.respuestaEmpleado);
      });
  }
}
