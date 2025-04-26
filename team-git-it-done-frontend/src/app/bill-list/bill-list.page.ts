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

  listOfBills: Bill[] = [];
  billToOwed: { [billId: number]: number } = {};

  constructor(private myBillService: BillService) { }

  ngOnInit(): void {
    this.myBillService.getAllBills().subscribe((bills) => {
      this.listOfBills = bills;
  
      this.listOfBills.forEach(bill => {
        if (bill.billId != null) { // Make sure billId exists
          this.myBillService.getSettledAmount(bill.billId).subscribe((response: any) => {
            this.billToOwed[bill.billId ?? 0] = bill.sharedPrice ?? 0 - response;
          });
        }
      });
    });
  }
  

  deleteBill(billId: number){
    console.log(billId);
    this.myBillService.deleteBill(billId).subscribe((response: any) => {
      console.log(response);
      this.listOfBills = this.listOfBills.filter(bill => bill.billId !== billId);
    });
  }

  editBill(billId: number){
  }

  settleBill(billId: number){
  }
}