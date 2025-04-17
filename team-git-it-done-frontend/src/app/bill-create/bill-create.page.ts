import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill';
import { BillService } from '../services/bill.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.page.html',
  styleUrls: ['./bill-create.page.scss'],
  standalone: false,
})
export class BillCreatePage implements OnInit {

newBill: Bill = new Bill();

constructor(private myBillService: BillService, private router: Router) { }

ngonInit(): void {
}

createNew(){
  this.myBillService.createBill(this.newBill).subscribe((response: any) => {
    console.log(response);
    this.router.navigate(["listall"]);
  })
}

}
