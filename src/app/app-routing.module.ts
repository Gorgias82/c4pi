import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { LoginCardComponent } from './login/login-card/login-card.component';
import { LoginRegistrationComponent } from './login/login-registration/login-registration.component';
import { AdminComponent } from './main/admin/admin.component';
import { MainCardComponent } from './main/main-card/main-card.component';
import { TestComponent } from './main/test/test.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home/login',
  },
  { path: 'home/login', component: LoginCardComponent },
  { path: 'home/registro', component: LoginRegistrationComponent },
  {
    path: 'home/main',
    component: MainCardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home/test',
    component: TestComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home/admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
  },
  // ,canActivate: [AuthGuarderviceS]
  {
    path: '**',
    redirectTo: 'home/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
