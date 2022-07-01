import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProxyManagerRoutingModule } from './proxy-manager-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MaterialModule } from '../../shared/material.module'
import { AddProxyComponent } from './add-proxy/add-proxy.component';
import { ListProxyComponent } from './list-proxy/list-proxy.component';


@NgModule({
  declarations: [
    AddProxyComponent,
    ListProxyComponent
  ],
  imports: [
    CommonModule,
    ProxyManagerRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class ProxyManagerModule { 
  constructor(){
    console.log('Proxy Module')
  }
}
