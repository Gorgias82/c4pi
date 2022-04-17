import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCardComponent } from './login/login-card/login-card.component';
import { LoginRegistrationComponent } from './login/login-registration/login-registration.component';
import { MainCardComponent } from './main/main-card/main-card.component';

const appRoutes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home/login'
  },
  // {
  //     path: '**',
  //     redirectTo: 'home/login'
  
  // },
  { path: 'home/login', component: LoginCardComponent },
  { path: 'home/registro', component: LoginRegistrationComponent},
  { path: 'home/main', component: MainCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
