import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FilterProductsDTO } from 'src/app/DTOs/Sliders/Products/FilterProductsDTO';
import { ProductCategory } from 'src/app/DTOs/Sliders/Products/ProductCategory';

declare function JqUiSlider():any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public searchStr: string="کیف";
  filterProducts: FilterProductsDTO = new FilterProductsDTO(
   null, null, null, 1, 0, 0, 0, 4, 0, 1,null, [], []
  );
  isLoading = true;
  pages: number[] = [];
  categories: ProductCategory[] = [];
    maxEndPrice:number=2000000;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {    

    this.searchStr=''; 
    this.activatedRoute.queryParams.subscribe(params => {
      
       let pageId = 1;
      if (params['pageId'] !== undefined) {
        pageId = parseInt(params['pageId'], 0);
      } 
      
      this.filterProducts.categories = params['categories'] ? params['categories'] : [];
      console.log(this.filterProducts.categories);
      this.filterProducts.pageId = pageId;
        this.filterProducts.startPrice = params['startPrice'] ? params['startPrice'] : null;
      this.filterProducts.endPrice = params['endPrice'] ? params['endPrice'] : null;
      this.filterProducts.orderBy = params['orderBy'] ? params['orderBy'] : null;
      this.filterProducts.title = params['title'] ? params['title'] : null;
   

      this.getProducts();
    });

    this.productsService.getProductActiveCategories().subscribe(res => {
      if (res.status === 'Success') {
        this.categories = res.data;
        console.log(this.categories);
      }
    });

    JqUiSlider();
  }
  search(){
    this.filterProducts.title =this.searchStr;

this.router.navigate(['products'],{queryParams:{
     
  title:this.filterProducts.title,
  orderBy:this.filterProducts.orderBy,
  categories: this.filterProducts.categories,
  startPrice: this.filterProducts.startPrice,
  endPrice: this.filterProducts.endPrice
  }})

    
  }
  formatLabel(value: number) {
    if (value<1000000&&value >= 1000) {
      return Math.round(value / 1000) + 'K';
    }
    if (value >= 1000000) {
      return Math.round(value / 1000000) + 'M';
    }

    return value;
  }
  setMinPrice(event:any){
this.filterProducts.startPrice=parseInt(event.value,0)
  
 
  }
  setMaxPrice(event:any){
this.filterProducts.endPrice=parseInt(event.value,0)
  }

filterButton() {
  if(this.filterProducts.startPrice!>this.filterProducts.endPrice!)
  this.filterProducts.endPrice=this.maxEndPrice;
  if(this.filterProducts.startPrice===0 && this.filterProducts.endPrice===this.maxEndPrice)
  {
    this.filterProducts.startPrice=null;
    this.filterProducts.endPrice=null;
    console.log("yes");
    
  }
  this.router.navigate(
    ['products'], {
      queryParams: {
        title:this.filterProducts.title,
        orderBy:this.filterProducts.orderBy,
        categories: this.filterProducts.categories,
        startPrice: this.filterProducts.startPrice,
        endPrice: this.filterProducts.endPrice
      }
    }
  );
}

  
  changeOrder(event:any){
    
    if(event.target.value==="null")
    {
      this.filterProducts.orderBy=null;
      this.router.navigate(['products'],{queryParams:{
        title:this.filterProducts.title,
        categories: this.filterProducts.categories,
        orderBy:this.filterProducts.orderBy,
         startPrice: this.filterProducts.startPrice,
        endPrice: this.filterProducts.endPrice}})
    }
    else
    this.router.navigate(['products'],{queryParams:{
      title:this.filterProducts.title,
      orderBy:this.filterProducts.orderBy,
      categories: this.filterProducts.categories,
      startPrice: this.filterProducts.startPrice,
      endPrice: this.filterProducts.endPrice
      }})
  
  }

  filterCategories(event: any) {
    const value = event.target.value;
    if (this.filterProducts.categories === undefined || this.filterProducts.categories === null) {
      this.filterProducts.categories = [];
    }
    if (event.target.checked) {
      this.filterProducts.categories.push(parseInt(value, 0));
      this.setCategoriesFilter();
    } else {
      this.filterProducts.categories = this.filterProducts.categories.filter(s => s !== parseInt(value, 0));
      this.setCategoriesFilter();
    }
  }

  setCategoriesFilter() {
    if (this.filterProducts.categories.length > 0) {
      console.log("bug is here",this.filterProducts);
      
      this.router.navigate(['products'], {queryParams: {
        title:this.filterProducts.title,
        categories: this.filterProducts.categories,orderBy:this.filterProducts.orderBy, startPrice: this.filterProducts.startPrice,
        endPrice: this.filterProducts.endPrice}});
    } else {
      this.router.navigate(['products'], {queryParams: {
        title:this.filterProducts.title,
        categories: this.filterProducts.categories,orderBy:this.filterProducts.orderBy, startPrice: this.filterProducts.startPrice,
        endPrice: this.filterProducts.endPrice}});
    }
  }
  setPrice(event:any){
    console.log(event);
    
  }
  setPage(page: number) {
    this.router.navigate(['products'], {queryParams: {
      title:this.filterProducts.title,
      pageId: page,  orderBy:this.filterProducts.orderBy,
      categories: this.filterProducts.categories,
      startPrice: this.filterProducts.startPrice,
      endPrice: this.filterProducts.endPrice  }});

  }
  nextPage(page:number){
   
    this.router.navigate(['products'],{queryParams:{
      title:this.filterProducts.title,
      pageId:page,  orderBy:this.filterProducts.orderBy,
      categories: this.filterProducts.categories,
      startPrice: this.filterProducts.startPrice,
      endPrice: this.filterProducts.endPrice }})
  
  
  }

  getProducts() {
    console.log("this is getProduct function" );
    this.productsService.getFilteredProducts(this.filterProducts).subscribe(res => {
      console.log(res);
      
      this.filterProducts = res.data;
      if (res.data.title === null) {
        this.filterProducts.title = '';
      }
      this.isLoading = false;
      this.pages = [];
      if (res.data.categories === null) {
        this.filterProducts.categories = [];
      }

      for (let i = this.filterProducts.startPage; i <= this.filterProducts.endPage; i++) {
        this.pages.push(i);
      }
    });
  }
}
