import { Bill } from "./bill";

export class BillLink {
    billLinkId: number;
    userId: number;
    billId: number;
    settled: number;
    bill?: Bill; 
  
    constructor(
      billLinkId: number = 0,
      userId: number = 0,
      billId: number = 0,
      settled: number = 0,
      bill?: Bill 
    ) {
      this.billLinkId = billLinkId;
      this.userId = userId;
      this.billId = billId;
      this.settled = settled;
      this.bill = bill;
    }
  }
  