import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { CloudLogsComponent } from './cloud-logs/cloud-logs.component';
import { CollectionEntityComponent } from './collection-entity/collection-entity.component';
import { CollectionListsComponent } from './collection-lists/collection-lists.component';
import { HeartbeatComponent } from './heartbeat/heartbeat.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobLogsComponent } from './job-logs/job-logs.component';
import { MigrationJobTrackingComponent } from './migration-job-tracking/migration-job-tracking.component';
import { MigrationReportComponent } from './migration-report/migration-report.component';
import { MigrationTrackStatusComponent } from './migration-track-status/migration-track-status.component';
import { ProfileFinderComponent } from './profile-finder/profile-finder.component';



const routes: Routes = [
    {path:"", redirectTo:"collection-list", pathMatch:"full"},
    {path: 'heartbeat', component:HeartbeatComponent },
    {path:'collection-list', component:CollectionListsComponent},
    {path:'cloud-logs', component:CloudLogsComponent},
    {path:'collection-entity', component:CollectionEntityComponent},
    {path:'profile-finder', component:ProfileFinderComponent},
    {path:'job-logs', component:JobLogsComponent},
    {path:'job-detail', component:JobDetailComponent},
    {path:'alert', component:AlertComponent},
    {path:'migration-track-status', component:MigrationTrackStatusComponent},
    {path:'migration-job-tracking', component:MigrationJobTrackingComponent},
    {path:'migration-report', component:MigrationReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageJobsRoutingModule { }
