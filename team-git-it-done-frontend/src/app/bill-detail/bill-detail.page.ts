import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill';
import { BillService } from '../services/bill.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.page.html',
  styleUrls: ['./bill-detail.page.scss'],
  standalone: false,
})
export class BillDetailPage implements OnInit {

//Property to store current bill Info
currentBill: Bill = new Bill();

billID: number | undefined;

 constructor(private actRoute: ActivatedRoute, private myBillService: BillService) {}

 ngOnInit(): void {
  //Extracted the ID from URL
  this .billID = parseInt(this.actRoute.snapshot.paramMap.get("billID")!, 0);
  console.log(this.billID);

  //Fetch the contact corresponding to the ID
  this.myBillService.getBillByID(this.billID).subscribe((response: Bill) =>{
    console.log(response);
    this.currentBill = response;
  })
 }

}
