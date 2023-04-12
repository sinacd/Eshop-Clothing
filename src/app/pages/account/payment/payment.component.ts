import { OrderService } from 'src/app/services/order.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlinePayment } from 'src/app/DTOs/Sliders/Payment/OnlinePayment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  isloading : boolean | null = null;
  filter: OnlinePayment = new OnlinePayment(
    0, "", "", 0
   );
  constructor(
    private activatedRoute: ActivatedRoute
    ,private orderService: OrderService,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
     this.filter.id = this.activatedRoute.snapshot.params['Id'] ? this.activatedRoute.snapshot.params['Id'] : "" ; 
     this.filter.authority = params['Authority'] ? params['Authority'] : "" ; 
     this.filter.status = params['Status'] ? params['Status'] : "";
     this.filter.refId = params['RefId'] ? params['RefId'] : "";
    });
    
    this.OnlinePayment();
    
  }
  sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


OnlinePayment() {

  this.orderService.getOnlinePayment(this.filter).subscribe(res => {
    console.log(res);
     if(res.status==="Success")
    {
      this.filter=res.data;
      this.isloading=true;
    } 
    else if (res.status==="Error")
    {
      this.filter=res.data;
      this.isloading=false;
    }
   
  
   
   
 

 
  });
}

}
