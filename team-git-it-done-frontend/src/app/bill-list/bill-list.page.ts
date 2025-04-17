// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-bill-list',
//   templateUrl: './bill-list.page.html',
//   styleUrls: ['./bill-list.page.scss'],
//   standalone: false,
// })
// export class BillListPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.page.html',
  styleUrls: ['./bill-list.page.scss'],
  standalone: false,
})
export class BillListPage implements OnInit {

  //property to store list of bills

listofBills: Bill[] = [];

  constructor(private myBillService: BillService) { }

  ngOnInit(): void {
    this.myBillService.getAllBills().subscribe((response: Bill[]) => {
      console.log(response);
      this.listofBills = response;
    })
  }

  deleteBill(id:number){
    console.log("Testing" + id);
    this.myBillService.deleteBill(id).subscribe((response: any) =>{
      console.log(response);
      this.ngOnInit();
    })
  }

}