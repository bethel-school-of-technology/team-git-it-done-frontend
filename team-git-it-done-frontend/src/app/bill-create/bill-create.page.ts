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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createNew(){
    this.myBillService.createBill(this.newBill).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(["listall"]);
    })
  }

  // creatNew() {
  //   this.myBillService.createBill(this.newBill).subscribe(() => {
  //     window.alert("Created BIll Successfully");
  //     this.router.navigate(['bill']);
  //   }, error => {
  //     console.log('Error: ', error)
  //     if (error.status === 401 || error.status === 403) {
  //       this.router.navigate(['signin']);
  //     }
  //   });
  // }


}
