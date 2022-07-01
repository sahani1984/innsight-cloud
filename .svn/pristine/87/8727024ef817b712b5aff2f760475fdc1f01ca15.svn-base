import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
 {path:"", component:PagesComponent, canActivate:[AuthGuard],  children:[
    {path:"", redirectTo:"avatar-manager", pathMatch:"full"}, 
    { path: 'avatar-manager', loadChildren: () => import('./avatar-manager/avatar-manager.module').then(m => m.AvatarManagerModule) },
    { path: 'proxy-manager', loadChildren: () => import('./proxy-manager/proxy-manager.module').then(m => m.ProxyManagerModule) },
    { path: 'news-source', loadChildren: () => import('./news-source/news-source.module').then(m => m.NewsSourceModule) },
    { path: 'client-manager', loadChildren: () => import('./client-manager/client-manager.module').then(m => m.ClientManagerModule) },
    { path: 'manage-jobs', loadChildren: () => import('./manage-jobs/manage-jobs.module').then(m => m.ManageJobsModule) }
  ]}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
