import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill';
import { BillService } from '../services/bill.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.page.html',
  styleUrls: ['./bill-list.page.scss'],
  standalone: false,
})
export class BillListPage implements OnInit {

  listOfBills: Bill[] = [];
  billToOwed: { [billId: number]: number } = {};

  constructor(private myBillService: BillService, private myDialogService: DialogService) { }

  ngOnInit(): void {
    this.loadBills();
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
    this.myDialogService.showPrompt("Settle Bill", "Enter amount to settle:").subscribe((response: any) => {
      if (response != null) {
        this.myBillService.settleBill(billId, response).subscribe((response: any) => {
          this.billToOwed[billId] -= response;
        });
      }
      this.loadBills();
    });
  }

  loadBills() {
    this.myBillService.getAllBills().subscribe((bills) => {
      this.listOfBills = bills;
  
      this.listOfBills.forEach(bill => {
        if (bill.billId != null) {
          this.myBillService.getSettledAmount(bill.billId).subscribe((response: any) => {  
            const sharedPrice = bill.sharedPrice ?? 0;
            const settledAmount = response ?? 0;
            this.billToOwed[bill.billId!] = sharedPrice - settledAmount;
          });
        }
      });
    });
  }
  
}