import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenRoutingModule } from './authen-routing.module';
import { AuthenComponent } from './authen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [AuthenComponent, LoginComponent],
  imports: [
    AuthenRoutingModule, 
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [ HttpClientModule],
})
export class AuthenModule { }
