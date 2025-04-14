// export class Bill {

//     id : number=0;
//     name : string="";
//     description : string="";
//     price : number=0;
// }

//constructor was added bellow

export class Bill {

    billid? : number=0;
    name? : "";
    description? : string="";
    price? : number=0;
    creatorId? : "";
    billLinks? : "";

    constructor(billid?: number, name?: "", description?: "", price?: number, creatorId?:"", billLinks?: "") {
        this.billid = billid;
        this.name = name;
        this.description = description;
        this.price = price;
        this.creatorId = creatorId;
        this.billLinks = billLinks;

    }
}

