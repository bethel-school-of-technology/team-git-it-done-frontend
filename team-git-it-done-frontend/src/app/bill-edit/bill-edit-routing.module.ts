import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillEditPage } from './bill-edit.page';

const routes: Routes = [
  {
    path: '',
    component: BillEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillEditPageRoutingModule {}
