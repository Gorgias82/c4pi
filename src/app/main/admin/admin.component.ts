import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/shared/empleado.model';
import { MainService } from '../main.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  empleados: Empleado[] = [];
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
        console.log(this.empleados);
      });
  }
}
