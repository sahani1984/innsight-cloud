import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageJobsRoutingModule } from './manage-jobs-routing.module';
import {MaterialModule} from '../../shared/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HighchartsChartModule } from 'highcharts-angular';

import { AlertComponent } from './alert/alert.component';
import { CloudLogsComponent } from './cloud-logs/cloud-logs.component';
import { CollectionEntityComponent } from './collection-entity/collection-entity.component';
import { CollectionListsComponent } from './collection-lists/collection-lists.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobLogsComponent } from './job-logs/job-logs.component';
import { MigrationJobTrackingComponent } from './migration-job-tracking/migration-job-tracking.component';
import { MigrationReportComponent } from './migration-report/migration-report.component';
import { MigrationTrackStatusComponent } from './migration-track-status/migration-track-status.component';
import { ProfileFinderComponent } from './profile-finder/profile-finder.component';
import { PaginationComponent } from '../../partial/pagination.component';
import { ChartsComponent } from './charts/charts.component';
import { HeartbeatComponent } from './heartbeat/heartbeat.component';


@NgModule({
  declarations: [
    AlertComponent,
    CloudLogsComponent,
    CollectionEntityComponent,
    CollectionListsComponent,
    JobDetailComponent,
    JobLogsComponent,
    MigrationJobTrackingComponent,
    MigrationReportComponent,
    MigrationTrackStatusComponent,
    ProfileFinderComponent,
    PaginationComponent,
    ChartsComponent,
    HeartbeatComponent
  ],
  imports: [
    CommonModule,
    ManageJobsRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    HighchartsChartModule
  ]
})
export class ManageJobsModule {}
