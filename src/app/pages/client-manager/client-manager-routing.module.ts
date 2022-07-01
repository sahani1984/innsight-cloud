import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientListComponent } from './client-list/client-list.component';



const routes: Routes = [
    {path:"", redirectTo:"list-client", pathMatch:"full"},
    {path:'add-client', component:AddClientComponent},
    {path:'update-client', component:AddClientComponent},
    {path:'list-client', component:ClientListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManagerRoutingModule { }
