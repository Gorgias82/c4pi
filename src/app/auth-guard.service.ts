import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public loginService: LoginService, public router: Router) {}
  canActivate() {
    if (this.usuarioAutentificado()) {
      return true;
    } else {
      this.router.navigate(['/home/login']);
      return false;
    }
  }

  usuarioAutentificado() {
    if (
      localStorage.getItem('id') === undefined ||
      localStorage.getItem('id') === null
    ) {
      return false;
    } else {
      return true;
    }
  }
}
