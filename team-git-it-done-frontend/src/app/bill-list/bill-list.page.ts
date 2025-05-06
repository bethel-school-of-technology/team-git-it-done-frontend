import { Component, OnInit, ViewChild } from '@angular/core';
import { Bill } from '../models/bill';
import { BillService } from '../services/bill.service';
import { DialogService } from '../services/dialog.service';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.page.html',
  styleUrls: ['./bill-list.page.scss'],
  standalone: false,
})
export class BillListPage implements OnInit {

  listOfBills: Bill[] = [];
  billToOwed: { [billId: number]: number } = {};

  @ViewChild(IonModal) modal!: IonModal;

  settleAmount: number | null = null;
  selectedBillId: number | null = null;

  constructor(
    private myBillService: BillService,
    private myDialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBills();
  }

  deleteBill(billId: number) {
    console.log(billId);
    this.myBillService.deleteBill(billId).subscribe((response: any) => {
      console.log(response);
      this.listOfBills = this.listOfBills.filter(bill => bill.billId !== billId);
    });
  }

  navigateToEditBill(billId: number) {
    this.router.navigate(['/bill-edit', billId]);
  }

  settleBill(billId: number) {
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.settleAmount, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm' && this.selectedBillId !== null) {
      const amount = event.detail.data;
      if (amount != null) {
        this.myBillService.settleBill(this.selectedBillId, amount).subscribe((response: any) => {
          this.billToOwed[this.selectedBillId!] -= response;
          this.loadBills();
          this.selectedBillId = null;
          this.settleAmount = null;
        });
      }
    }
  }

  openSettleModal(billId: number) {
    this.selectedBillId = billId;
    this.modal.present();
  }
}
