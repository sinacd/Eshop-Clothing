export class OnlinePayment {
    constructor(
        public id : number,
        public authority :string,
        public  status :string,
        public refId : number,


    ){}
}