import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/shared/cliente.model';
import { Opinion } from 'src/app/shared/opinion.model';
import { MainService } from '../main.service';

@Component({
  selector: 'app-vista-clientes',
  templateUrl: './vista-clientes.component.html',
  styleUrls: ['./vista-clientes.component.css'],
})
export class VistaClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  opiniones: Opinion[] = [];
  private clientesSub!: Subscription;
  private opinionesSub!: Subscription;
  displayedColumns: string[] = ['dni', 'nombre', 'apellido1', 'apellido2'];
  dataSource: any;
  constructor(private MainService: MainService) {}

  ngOnInit(): void {
    this.MainService.getClientes();
    this.clientesSub = this.MainService.getClientesUpdatedListener().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
        this.dataSource = new MatTableDataSource(this.clientes);
        console.log(this.clientes);
      }
    );
    this.MainService.getOpiniones();
    this.opinionesSub =
      this.MainService.getOpinionesUpdatedListener().subscribe(
        (opiniones: Opinion[]) => {
          this.opiniones = opiniones;
          console.log(this.opiniones);
        }
      );
  }

  applyFilter(e: any) {
    let filterValue = e.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
