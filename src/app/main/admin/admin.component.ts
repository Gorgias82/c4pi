import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/shared/empleado.model';
import { MainService } from '../main.service';
import { MatTableDataSource } from '@angular/material/table';
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
  private empleadosSub!: Subscription;
  constructor(public mainService: MainService) {}

  ngOnInit(): void {
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
  deleteEmpleado(id: string) {
    console.log('empleado a eliminar' + id);
  }
  ngOnDestroy(): void {
    if (this.empleadosSub !== undefined) {
      this.empleadosSub.unsubscribe();
    }
  }
}
