import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCardComponent } from './main-card/main-card.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    MainCardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,

  ],

})
export class MainModule { }
