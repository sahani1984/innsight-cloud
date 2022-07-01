import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarManagerRoutingModule } from './avatar-manager-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MaterialModule} from '../../shared/material.module'

import { AvatarAddComponent } from './avatar-add/avatar-add.component';
import { AvatarListComponent } from './avatar-list/avatar-list.component';
import { AvatarAddCategoryComponent } from './avatar-add-category/avatar-add-category.component';
import { AvatarListCategoryComponent } from './avatar-list-category/avatar-list-category.component';


@NgModule({
  declarations: [    
    AvatarAddComponent,
    AvatarListComponent,
    AvatarAddCategoryComponent,
    AvatarListCategoryComponent
  ],
  imports: [
    CommonModule,
    AvatarManagerRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AvatarManagerModule {}
