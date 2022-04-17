import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCardComponent } from './login-card/login-card.component';
//modules de materials
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 

import { RouterModule, Routes } from '@angular/router';

import {FormsModule} from '@angular/forms';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';


const loginRoutes: Routes = [
  {
      path: 'home',
      component: LoginCardComponent,
      children: [
          { path: '', component: LoginCardComponent, pathMatch: 'full' },
          { path: 'login', component: LoginCardComponent }
      ]
  }
];

@NgModule({
  declarations: [
    LoginCardComponent,
    LoginRegistrationComponent
  ],
  imports: [
    RouterModule.forChild(loginRoutes),
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
 
 
  ],
  exports: [
    RouterModule
]
})
export class LoginModule { }
