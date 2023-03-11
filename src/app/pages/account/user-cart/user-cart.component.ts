import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { OrderCartDetail } from 'src/app/DTOs/Sliders/Orders/OrderCartDetail';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  details: OrderCartDetail[] | null = [];
  totalPrice = 0;

  constructor(
    public orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.orderService.getOrderDetails().subscribe(res => {
      this.details = res;
      this.totalPrice = 0;
      if (this.details !== null) {
        for (let i = 0; i < this.details.length; i++) {
          this.totalPrice += this.details[i].price * this.details[i].count;
        }
      }
    });
  }


removeOrderDetail(detailId:number){
  this.orderService.removeOrderDetail(detailId).subscribe(res=>{
    if (res.status==="Success"){
      this.details=res.data;
      this.orderService.setOrderDetails(res.data);
      if(this.details!=null){
        this.totalPrice = 0;
        for(let i=0;i<this.details?.length;i++)
        this.totalPrice+=this.details[i].price*this.details[i].count;
      }
    }
  })
}


}
