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

  //Property to store current bill Info
  updateBill: Bill = new Bill();

  billID: number | undefined;

  constructor(private actRoute: ActivatedRoute, private myBillService: BillService, private router: Router) { }

  ngOnInit(): void {
    //Extracted the ID from URL
    this.billID = parseInt(this.actRoute.snapshot.paramMap.get("billID")!, 0);
    console.log(this.billID);

    //Fetch the contact corresponding to the ID
    this.myBillService.getBillByID(this.billID).subscribe(response => {
      console.log(response);
      // this.editBill = response;
    })
  }

  editBill() {
    this.updateBill.billId = this.billID; // Ensure billId is set
    this.myBillService.editBill(this.updateBill).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(["listall"]);

    })
  }
}
