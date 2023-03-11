import { ImagePath } from './../../Utilities/PathTools';
import { OrderCartDetail } from './../../DTOs/Sliders/Orders/OrderCartDetail';
import { OrderService } from './../../services/order.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-cart',
  templateUrl: './header-cart.component.html',
  styleUrls: ['./header-cart.component.scss']
})
export class HeaderCartComponent implements OnInit {
details:OrderCartDetail[]| null=[];
imagepath=ImagePath;
totalPrice = 0;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrderDetails().subscribe(res=>{
  
this.details=res;
if(this.details!=null){
  this.totalPrice = 0;
  for(let i=0;i<this.details?.length;i++)
  this.totalPrice+=this.details[i].price*this.details[i].count;
}
else
if(this.details==null){
  this.totalPrice = 0;
}
    })
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
