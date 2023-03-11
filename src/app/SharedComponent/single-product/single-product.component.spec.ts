import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleProductComponent } from './single-product.component';
import { SliderService } from 'src/app/services/slider.service';
import { Pipe, PipeTransform, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Product } from 'src/app/DTOs/Sliders/Products/product';
import { By } from '@angular/platform-browser';
import { OrderService } from 'src/app/services/order.service';

describe('SingleProductComponent', () => {
  let component: SingleProductComponent;
  let fixture: ComponentFixture<SingleProductComponent>;
  let product: any;
  let mockOrderService:any;

  beforeEach(async () => {
    mockOrderService= jasmine.createSpyObj(['addProductToOrder','setOrderDetails']);
    product={id: 1,imageName: "1.jpg",productName :  "کیف دستی زنانه کد 1558",price:200000
  
  }
    await TestBed.configureTestingModule({
      declarations: [ SingleProductComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      providers:[
        { provide: OrderService, useValue: mockOrderService }
      ]
    
    })
   

    fixture = TestBed.createComponent(SingleProductComponent);
  
  });

  it('should get a product and show it in products section', () => {
    fixture.componentInstance.product=product;
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();


    expect(fixture.debugElement.query(By.css('#price'))
    .nativeElement.textContent).toContain('200000 تومان');
    expect(fixture.debugElement.query(By.css('#name'))
    .nativeElement.textContent).toContain('توپ');
   
    expect(fixture.componentInstance.productName).toContain('-');
  });
});
