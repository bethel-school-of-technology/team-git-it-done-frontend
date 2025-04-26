import { BillLink } from "./bill-link";

export class Bill {

    billId?: number;
    name?: string;
    description?: string;
    price?: number;
    sharedPrice?: number; 
    creatorId?: number;
    billLinks?: BillLink[]; 

    constructor(
        billId?: number,
        name?: string,
        description?: string,
        price?: number,
        sharedPrice?: number,
        creatorId?: number,
        billLinks?: BillLink[]
    ) {
        this.billId = billId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.sharedPrice = sharedPrice;
        this.creatorId = creatorId;
        this.billLinks = billLinks;
    }
}
