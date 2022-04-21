import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    BrowserAnimationsModule,
    LoginModule,
    HttpClientModule
   
  ],
  providers: [HttpClient,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
