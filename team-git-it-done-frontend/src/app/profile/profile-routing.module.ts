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
        loadChildren: () =>
          import('../bill-list/bill-list.module').then(
            (m) => m.BillListPageModule
          ),
      },
      { 
        path: 'bill-create',
        loadChildren: () =>
          import('../bill-create/bill-create.module').then(
            (m) => m.BillCreatePageModule
          ),
      },
      {
        path: 'friends',
        loadChildren: () =>
          import('../friends/friends.module').then((m) => m.FriendsPageModule),
      },
      {
        path: '',
        redirectTo: 'bill-list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
