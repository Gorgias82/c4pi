import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/shared/empleado.model';
import { MainService } from '../main.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigurableFocusTrap } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  empleados: Empleado[] = [];
  hotel: string = '';
  displayedColumns: string[] = ['login', 'borrado'];
  dataSource: any;
  errorDelete: boolean = false;
  respuestaDelete: string = '';
  private empleadosSub!: Subscription;
  private deleteEmpleadoSub!: Subscription;
  constructor(public mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('rango') !== '1') {
      this.router.navigate(['home/login']);
    }
    let id = localStorage.getItem('id') as unknown as number;
    const idEnvio = { id: id };
    this.mainService.getEmpleados(idEnvio);
    this.empleadosSub = this.mainService
      .getEmpleadosUpdatedListener()
      .subscribe((response: Empleado[]) => {
        this.empleados = response;
        this.hotel = this.empleados[0].hotel;
        this.dataSource = new MatTableDataSource(this.empleados);
        console.log(this.empleados);
      });
  }
  applyFilter(e: any) {
    let filterValue = e.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteEmpleado(id: number, nombre: string) {
    console.log('empleado a eliminar' + id);
    let confirmacion = confirm(
      `Esta seguro de que quiere eliminar al empleado ${nombre}`
    );
    if (confirmacion) {
      this.mainService.deleteEmpleado({ id: id as unknown as number });
      this.deleteEmpleadoSub = this.mainService
        .getDeleteEmpleadoUpdatedListener()
        .subscribe((respuesta: boolean) => {
          this.errorDelete = !respuesta;
          this.respuestaDelete = this.errorDelete
            ? `No se ha podido borrar al empleado ${nombre}`
            : ``;
          if (respuesta) {
            window.location.reload();
          }
        });
    }
  }
  ngOnDestroy(): void {
    if (this.empleadosSub !== undefined) {
      this.empleadosSub.unsubscribe();
    }
  }
}
