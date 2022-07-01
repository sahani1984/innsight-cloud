import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddLanguageComponent } from './add-language/add-language.component';
import { AddNewsSourceComponent } from './add-news-source/add-news-source.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ListLanguageComponent } from './list-language/list-language.component';
import { ListNewsSourceComponent } from './list-news-source/list-news-source.component';



const routes: Routes = [
    {path:"", redirectTo:"list-news-source", pathMatch:"full"},
    {path:'add-news-source', component:AddNewsSourceComponent},
    {path:'list-news-source', component:ListNewsSourceComponent},
    {path:'update-news-source/:id', component:AddNewsSourceComponent},
    {path:'add-category', component:AddCategoryComponent},
    {path:'list-category', component:ListCategoryComponent},
    {path:'add-language', component:AddLanguageComponent},
    {path:'list-language', component:ListLanguageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsSourceRoutingModule { }
