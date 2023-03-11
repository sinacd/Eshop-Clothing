import { OrderService } from './../../services/order.service';
import { ImagePath } from './../../Utilities/PathTools';
import { Product } from './../../DTOs/Sliders/Products/product';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  @ViewChild('sweetAlart')
  private readonly sweetAlart!: SwalComponent;
  count:number =1;
  @Input() product!: any;
imagePath=ImagePath;
  productName!: string;
  constructor(private orderservice: OrderService) { }

  ngOnInit(): void {
    this.productName=this.product.productName.replace(/\s+/g,'-')
   
    
  }
  addProductToOrder() {
    const productId=this.product.id ;
    const count = this.count;
    this.orderservice.addProductToOrder(productId,count).subscribe(res=>{
      console.log(res);
      
      if(res.status==="Success")
      {
        this.sweetAlart.title="کالا به سبد خرید اصافه شد"; 
        this.sweetAlart.fire();
        this.orderservice.setOrderDetails(res.data.details)
      }
      else {
         this.sweetAlart.title=res.data.message; 
         this.sweetAlart.icon="warning"
        this.sweetAlart.fire();
      }
    })
  }





}
