import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/bill';
import { ActivatedRoute } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { Router } from '@angular/router';
import { BillLink } from 'src/app/models/bill-link';
import { DialogService } from '../services/dialog.service';
import { UserService } from '../services/user.service';
import { User } from 'src/app/models/user'; // Import User model

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.page.html',
  styleUrls: ['./bill-edit.page.scss'],
  standalone: false,
})
export class BillEditPage implements OnInit {

  updateBill: Bill = new Bill(); // This will be populated with current bill info
  billID: number | undefined;
  linkedFullUsers: User[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private myBillService: BillService,
    private userService: UserService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const billIDParam = this.actRoute.snapshot.paramMap.get("billId");
    this.billID = billIDParam ? parseInt(billIDParam, 10) : undefined;
  
    this.loadPage();
  }
  

  editBill() {
    if (this.billID !== undefined) {
      this.updateBill.billId = this.billID;
      this.myBillService.editBill(this.updateBill).subscribe((response: any) => {
        this.router.navigate(["/profile/bill-list"]); 
      });
    }
  }


  cancel() {
    this.router.navigate(['/profile/bill-list']);
  }

  createBillLink(userId: number) {
    var billLink = new BillLink();
    billLink.billId = this.updateBill.billId ?? 0;
    billLink.settled = 0;
    billLink.bill = this.updateBill;
    billLink.userId = userId;
  
    this.myBillService.createBillLink(billLink).subscribe((response: any) => {
      alert('Bill Link Created');
      this.loadPage(); 
    });
  }
  

  getUserToLink() {
    this.dialogService.getUserIdFromEmail("Link User", "Enter the email of the user you want to link to this bill").subscribe((userId: number) => {
      if (userId) {
        this.createBillLink(userId);
      } else {
        alert('No such user found');
      }
    });
  }

  deleteBillLink(billLinkId: number) {
    this.myBillService.deleteBillLink(billLinkId).subscribe((response: any) => {
      alert('Bill Link Deleted:');
      this.loadPage();
    });
  }
  

  getUserToRemove(userEmail: string) {
    this.userService.getUserIdFromEmail(userEmail).subscribe((userId) => {
      const billLink = this.updateBill.billLinks?.find(link => link.userId === userId);
      if (billLink && billLink.billLinkId) {
        this.deleteBillLink(billLink.billLinkId);
      } else {
        alert('No BillLink found for the provided user email');
      }
    });
  }
  
  loadPage(): void {
    this.linkedFullUsers = []; // Clear previous users to avoid duplicates
  
    if (this.billID !== undefined) {
      this.myBillService.getBillByID(this.billID).subscribe(response => {
        this.updateBill = response;
  
        if (this.updateBill.billLinks) {
          this.updateBill.billLinks.forEach(link => {
            this.userService.getUserById(link.userId).subscribe((user: { firstName?: string }) => {
              if (user.firstName) {
                this.linkedFullUsers.push(user as User); // Cast to User type
              } else {
                alert('User firstName is undefined');
              }
            });
          });
        }
      });
    }
  }
  

}
