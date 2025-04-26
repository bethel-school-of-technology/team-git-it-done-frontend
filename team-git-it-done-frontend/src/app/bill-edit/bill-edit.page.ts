import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/bill';
import { ActivatedRoute } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.page.html',
  styleUrls: ['./bill-edit.page.scss'],
  standalone: false,
})
export class BillEditPage implements OnInit {

  updateBill: Bill = new Bill(); // This will be populated with current bill info
  billID: number | undefined;

  constructor(
    private actRoute: ActivatedRoute,
    private myBillService: BillService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const billIDParam = this.actRoute.snapshot.paramMap.get("billId");
    this.billID = billIDParam ? parseInt(billIDParam, 10) : undefined;
    console.log('Editing Bill ID:', this.billID);

    if (this.billID !== undefined) {
      this.myBillService.getBillByID(this.billID).subscribe(response => {
        console.log('Fetched Bill:', response);
        this.updateBill = response;
      });
    }
  }

  editBill() {
    if (this.billID !== undefined) {
      this.updateBill.billId = this.billID;
      this.myBillService.editBill(this.updateBill).subscribe((response: any) => {
        console.log('Bill Updated:', response);
        this.router.navigate(["/bill-list"]); 
      });
    }
  }

  cancel() {
    this.router.navigate(['/bill-list']);
  }

  // createBillLink(){
  //   this.myBillService.createBillLink()
  // }
  
}
