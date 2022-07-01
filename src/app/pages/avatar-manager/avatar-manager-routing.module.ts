import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvatarAddComponent } from './avatar-add/avatar-add.component';
import { AvatarListComponent } from './avatar-list/avatar-list.component';
import { AvatarAddCategoryComponent } from './avatar-add-category/avatar-add-category.component';
import { AvatarListCategoryComponent } from './avatar-list-category/avatar-list-category.component';

const routes: Routes = [ 
    {path:"", redirectTo:"avatar-list", pathMatch:"full"},
    {path:'avatar-list', component:AvatarListComponent},
    {path:'avatar-add', component:AvatarAddComponent},
    {path:'avatar-update/:id', component:AvatarAddComponent},
    {path:'avatar-list-category', component:AvatarListCategoryComponent},
    {path:'avatar-add-category', component:AvatarAddCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvatarManagerRoutingModule { }
