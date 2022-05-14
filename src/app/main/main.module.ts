import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCardComponent } from './main-card/main-card.component';

import { NavbarComponent } from './navbar/navbar.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';

import { ReactiveFormsModule } from '@angular/forms';

//modules de materials
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 
import {FormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { VistaClientesComponent } from './vista-clientes/vista-clientes.component';

@NgModule({
  declarations: [
    MainCardComponent,
    NavbarComponent,
    RegistroClienteComponent,
    VistaClientesComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,

  ],

})
export class MainModule { }
