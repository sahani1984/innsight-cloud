import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProxyComponent } from './add-proxy/add-proxy.component';
import { ListProxyComponent } from './list-proxy/list-proxy.component';


const routes: Routes = [
    {path:"", redirectTo:"list-proxy", pathMatch:"full"},
    {path:'add-proxy', component:AddProxyComponent},
    {path:'proxy-update/:id', component:AddProxyComponent},
    {path:'list-proxy', component:ListProxyComponent}
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProxyManagerRoutingModule { }
