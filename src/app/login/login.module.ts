import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCardComponent } from './login-card/login-card.component';


import { RouterModule, Routes } from '@angular/router';


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
  
 
 
  ],
  exports: [
    RouterModule
]
})
export class LoginModule { }
