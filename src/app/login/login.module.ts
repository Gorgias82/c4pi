import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCardComponent } from './login-card/login-card.component';


import { RouterModule, Routes } from '@angular/router';


import { LoginRegistrationComponent } from './login-registration/login-registration.component';

//modules de materials
import { MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 
import {FormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';

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
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule
 
 
  ],
  exports: [
    RouterModule
]
})
export class LoginModule { }
