import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import {FormsModule, ReactiveFormsModule} from  '@angular/forms';
import {MaterialModule} from '../shared/material.module'

// import { AccountsComponent } from './accounts.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    // AccountsComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule

  ]
})
export class AccountsModule { }
