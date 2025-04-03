import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillCreatePage } from './bill-create.page';

const routes: Routes = [
  {
    path: '',
    component: BillCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillCreatePageRoutingModule {}
