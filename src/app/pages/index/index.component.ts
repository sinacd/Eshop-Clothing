import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getUserCartDetails().subscribe(res=>{
      console.log(res);
      
      if(res.status==="Success")
      {
        this.orderService.setOrderDetails(res.data)
      }
    })
    
  }

}
