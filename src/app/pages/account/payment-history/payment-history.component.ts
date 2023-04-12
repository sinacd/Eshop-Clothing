import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { OrderCartDetail } from 'src/app/DTOs/Sliders/Orders/OrderCartDetail';
import { OrderHistory } from 'src/app/DTOs/Sliders/Orders/OrderHistory';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentHistoryComponent {
  orders: OrderHistory[] | null = [];
  details: OrderCartDetail[][]  = [];
  totalPrice = 0;

  constructor(
    public orderService: OrderService,
    private router:Router
  ) {
  }



  ngOnInit(): void {
  
    this.orderService.getUserOrders().subscribe(res => {
      this.orders=res.data;
  
      console.log(res.data);
    })

this.getOrderDetailHistory();

  }

getOrderDetailHistory()
{
  this.orderService.GetUserOrderDetailsHistory().subscribe(res => {
    this.details = res.data;
   
    
    this.totalPrice = 0;
 
  });
}

findDetails(i: any) {
  return this.details[i];

}




}
