import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillListPage } from './bill-list.page';


const routes: Routes = [
  {
    path: '',
    component: BillListPage,
    children: [
      // {
      //   path: 'bill-list',
      //   loadChildren: () =>
      //     import('../bill-list/bill-list.module').then(
      //       (m) => m.BillListPageModule
      //     ),
      // },
      // { 
      //   path: 'bill-create',
      //   loadChildren: () =>
      //     import('../bill-create/bill-create.module').then(
      //       (m) => m.BillCreatePageModule
      //     ),
      // },
      // {
      //   path: '',
      //   redirectTo: 'bill-list',
      //   pathMatch: 'full',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillListPageRoutingModule {}
