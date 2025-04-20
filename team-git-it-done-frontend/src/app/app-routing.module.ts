import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'bill-detail/:id',
    loadChildren: () => import('./bill-detail/bill-detail.module').then( m => m.BillDetailPageModule)
  },
  {
    path: 'bill-edit/:id',
    loadChildren: () => import('./bill-edit/bill-edit.module').then( m => m.BillEditPageModule)
  },
  {
    path: 'bill-list',
    loadChildren: () => import('./bill-list/bill-list.module').then( m => m.BillListPageModule)
  },

  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
 
  {
    path: 'bill-create',
    loadChildren: () => import('./bill-create/bill-create.module').then( m => m.BillCreatePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
