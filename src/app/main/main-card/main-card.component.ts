import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCardComponent } from '../../login/login-card/login-card.component';
import { LoginRegistrationComponent } from '../../login/login-registration/login-registration.component';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.css']
})
export class MainCardComponent implements OnInit {

  logReg !: LoginRegistrationComponent;
  constructor(public loginService : LoginService,public router : Router) { }

  ngOnInit(): void {
    if(this.loginService.data === undefined){
      this.router.navigate(['/home/login']);
    }
  }

}