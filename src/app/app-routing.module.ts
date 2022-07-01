import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:"", redirectTo:"",  pathMatch:'full'},
  {path:"", loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
  {path:"pages", loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) } ,
  {path:'404', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
