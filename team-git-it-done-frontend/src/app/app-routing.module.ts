import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {

    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'bill-detail/:id',

    loadChildren: () => import('./bill-detail/bill-detail.module').then( m => m.BillDetailPageModule)
  },
  {
    path: 'bill-edit/:billId',
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
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
 
  {
    path: 'bill-create',
    loadChildren: () => import('./bill-create/bill-create.module').then( m => m.BillCreatePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./friends/friends.module').then( m => m.FriendsPageModule)
  }
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
