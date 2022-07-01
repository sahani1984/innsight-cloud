import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientManagerRoutingModule } from './client-manager-routing.module';
import {MaterialModule} from '../../shared/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

import { AddClientComponent } from './add-client/add-client.component';
import { ClientListComponent } from './client-list/client-list.component';
import {ChartsComponent} from './charts/charts.component'
@NgModule({
  declarations: [
    AddClientComponent,
    ClientListComponent,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    ClientManagerRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    HighchartsChartModule
  ]
})
export class ClientManagerModule { }
