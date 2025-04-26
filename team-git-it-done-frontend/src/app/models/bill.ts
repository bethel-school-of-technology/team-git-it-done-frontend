// export class Bill {

import { BillLink } from "./bill-link";

//     id : number=0;
//     name : string="";
//     description : string="";
//     price : number=0;
// }

//constructor was added bellow

export class Bill {

    billId? : number;
    name? : string;
    description? : string;
    price? : number;
    creatorId? : number;
    billLinks? : BillLink;

    constructor(id?: number, name?: string, description?: string, price?: number, creatorId?:number, billLinks?: BillLink) {
        this.billId = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.creatorId = creatorId;
        this.billLinks = billLinks;

    }
}

