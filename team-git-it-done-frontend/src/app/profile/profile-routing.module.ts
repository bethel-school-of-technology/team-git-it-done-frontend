import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
     
      {
        path: 'bill-list',
        loadChildren: () => import('../bill-list/bill-list.module').then(m => m.BillListPageModule)
      },
      // {
      //   path: 'profile-edit',
      //   loadChildren: () => import('../profile-edit/profile-edit.module').then(m => m.ProfileEditComponent)
      // },
      // {
      //   path: 'photos',
      //   loadChildren: () => import('../photos/photos.module').then(m => m.PhotosPageModule)
      // },
      {
        path: '',
        redirectTo: 'bill-list',
        pathMatch: 'full'
      }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
