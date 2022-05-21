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
  displayedColumns: string[] = [
    'dni',
    'nombre',
    'apellido1',
    'apellido2',
    'rojo',
    'verde',
    'azul',
    'amarillo',
    'cantidadOpiniones',
  ];
  dataSource: any;
  filaSeleccionada: string = '';
  constructor(private MainService: MainService) {}

  ngOnInit(): void {
    this.MainService.getClientes();
    this.clientesSub = this.MainService.getClientesUpdatedListener().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
        for (let cliente of this.clientes) {
          cliente.rojo = { cantidad: 0, porcentaje: 0 };
          cliente.verde = { cantidad: 0, porcentaje: 0 };
          cliente.azul = { cantidad: 0, porcentaje: 0 };
          cliente.amarillo = { cantidad: 0, porcentaje: 0 };
          cliente.cantidadOpiniones = 0;
        }
      }
    );
    this.MainService.getOpiniones();
    this.opinionesSub =
      this.MainService.getOpinionesUpdatedListener().subscribe(
        (opiniones: Opinion[]) => {
          this.opiniones = opiniones;
        }
      );
    setTimeout(() => {
      this.cargarOpiniones();
    }, 500);
  }

  cargarOpiniones() {
    console.log('carga opiniones');
    for (let cliente of this.clientes) {
      for (let opinion of this.opiniones) {
        if (cliente.id == opinion.id_cliente) {
          switch (opinion.color) {
            case 0:
              cliente.rojo.cantidad = opinion.cantidad;
              break;
            case 1:
              cliente.verde.cantidad = opinion.cantidad;
              break;
            case 2:
              cliente.azul.cantidad = opinion.cantidad;
              break;
            case 3:
              cliente.amarillo.cantidad = opinion.cantidad;
              break;
          }
          cliente.cantidadOpiniones += opinion.cantidad;
        }
      }

      cliente.rojo.porcentaje = Math.floor(
        (cliente.rojo.cantidad / cliente.cantidadOpiniones) * 100
      );
      cliente.verde.porcentaje = Math.floor(
        (cliente.verde.cantidad / cliente.cantidadOpiniones) * 100
      );
      cliente.azul.porcentaje = Math.floor(
        (cliente.azul.cantidad / cliente.cantidadOpiniones) * 100
      );
      cliente.amarillo.porcentaje = Math.floor(
        (cliente.amarillo.cantidad / cliente.cantidadOpiniones) * 100
      );
      cliente.rojo.porcentaje = isNaN(cliente.rojo.porcentaje)
        ? 0
        : cliente.rojo.porcentaje;
      cliente.azul.porcentaje = isNaN(cliente.azul.porcentaje)
        ? 0
        : cliente.azul.porcentaje;
      cliente.verde.porcentaje = isNaN(cliente.verde.porcentaje)
        ? 0
        : cliente.verde.porcentaje;
      cliente.amarillo.porcentaje = isNaN(cliente.amarillo.porcentaje)
        ? 0
        : cliente.amarillo.porcentaje;
    }
    this.dataSource = new MatTableDataSource(this.clientes);
    // setTimeout(() => {
    //   console.log(this.clientes);
    //   this.dataSource = new MatTableDataSource(this.clientes);
    // }, 1000);

    console.log(this.clientes);
  }

  onColor(e: any) {
    let letra = e.target.className.replace('mat-cell cdk-cell ', '').charAt(1);

    let fila = e.target.parentNode;

    switch (letra) {
      case 'o':
        fila.className = fila.className + ' rojoRow';
        break;
      case 'z':
        fila.className = fila.className + ' azulRow';
        break;
      case 'e':
        fila.className = fila.className + ' verdeRow';
        break;
      case 'm':
        fila.className = fila.className + ' amarilloRow';
        break;
    }
  }
  applyFilter(e: any) {
    let filterValue = e.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onColorLeave(e: any) {
    let fila = e.target.parentNode;
    console.log(fila.childNodes);
    fila.className = fila.className.replace('rojoRow', '');
    fila.className = fila.className.replace('azulRow', '');
    fila.className = fila.className.replace('verdeRow', '');
    fila.className = fila.className.replace('amarilloRow', '');
  }
}
