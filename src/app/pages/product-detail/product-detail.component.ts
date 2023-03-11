import { OrderService } from './../../services/order.service';
import { AddProductComment } from './../../DTOs/Sliders/Products/AddProductComment';
import { AuthService } from './../../services/auth.service';
import { CurrentUser } from './../../DTOs/Sliders/Account/CurrentUser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductGallery } from './../../DTOs/Sliders/Products/ProductGallery';
import { ImageGalleryPath, ImagePath } from './../../Utilities/PathTools';
import { Product } from './../../DTOs/Sliders/Products/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCommentDTO } from 'src/app/DTOs/Sliders/Products/ProductCommentDTO';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('sweetAlart')
  private readonly sweetAlart!: SwalComponent;
  count:number =1;
  product!: Product;
  galleries!: ProductGallery[];
  imgPath=ImagePath;
  imageGalleryPath=ImageGalleryPath;
  mainImage!: string;
  selectedImagedId=0;
  relatedProducts:Product[]=[];
  comments:ProductCommentDTO[]=[];
  currentUser!:CurrentUser;
commentForm!:FormGroup;



  constructor(private productService :ProductsService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private authService :AuthService,
    private orderservice: OrderService
    ) { }

  ngOnInit(): void {
this.authService.getCurrentUser().subscribe(res=>{
  if(res!=null){
    this.currentUser=res;
  }
})
    this.productService.getSingleProduct(this.activatedRoute.snapshot.params['productId']).subscribe(res=>{
 
      if (res.status==='NotFound')
      {
        this.router.navigate(['']);
      }
      else {
      
     //   console.log(res);
        
        this.product=res.data.product;
        this.galleries=res.data.galleries;
        this.mainImage=this.imgPath+this.product.imageName;
      }
      
      this.productService.getRelatedProducts(this.product.id).subscribe(result => {
       if (result.status === 'Success') {
         this.relatedProducts = result.data;
       }     
   })
      this.productService.getProductComments(this.product.id).subscribe(result => {
       if (result.status === 'Success') {
         this.comments = result.data;
   //      console.log(result);
         
       }  
   })
   });
this.commentForm=new FormGroup({
  text:new FormControl(null,[
    Validators.required,
    Validators.maxLength(100)
  ])
});

  }

  addComment() {
    if (this.commentForm.valid) {
      const comment = new AddProductComment(this.product.id, this.commentForm.controls['text'].value);
      // add comment to database
      this.productService.addProductComment(comment).subscribe(res => {
        if (res.status === 'Success') {
    //      console.log(res);
          const commentDTO = res.data;
          commentDTO.userFullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
          this.comments.unshift(commentDTO);
          this.commentForm.reset();
        }
      });
    }
  }
  


  selectImage (imageId:number){
    if(imageId!=0)
    {
      const gallery = this.galleries.filter(g=>g.id===imageId)[0];
  //    console.log(gallery);
      this.selectedImagedId=imageId;
      this.mainImage=this.imageGalleryPath+gallery.imageName;
      
    }
    else {
      this.selectedImagedId=0;
      this.mainImage=this.imgPath+this.product.imageName;
    }

  }
addCount(){
this.count +=1;
}
minusCount(){
if (this.count>1)
this.count -=1;
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
