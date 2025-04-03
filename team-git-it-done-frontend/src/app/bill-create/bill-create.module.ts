import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillCreatePageRoutingModule } from './bill-create-routing.module';

import { BillCreatePage } from './bill-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillCreatePageRoutingModule
  ],
  declarations: [BillCreatePage]
})
export class BillCreatePageModule {}
