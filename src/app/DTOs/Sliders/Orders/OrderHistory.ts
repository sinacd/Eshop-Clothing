export class OrderHistory {
    constructor(
        public id : number,
        public paymentDate : Date,
       public  finalPayment :number,
       public  expanded :boolean = false
       
    ){}
}