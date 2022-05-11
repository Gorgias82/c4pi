import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthGuardService } from './auth-guard.service';
import { MainModule } from './main/main.module';


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



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    BrowserAnimationsModule,
    LoginModule,
    HttpClientModule,
    MainModule,
    BrowserAnimationsModule,
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
  providers: [HttpClient,AuthGuardService],
  bootstrap: [AppComponent],
  // exports : [
  //   MatCardModule,
  //   MatFormFieldModule,
  //   MatButtonModule,
  //   MatInputModule,
  //   FormsModule,
  //   MatSelectModule,
  //   MatDividerModule,
  //   MatMenuModule
  // ]
})
export class AppModule { }
