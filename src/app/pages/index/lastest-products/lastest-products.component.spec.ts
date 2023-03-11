import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastestProductsComponent } from './lastest-products.component';

describe('LastestProductsComponent', () => {
  let component: LastestProductsComponent;
  let fixture: ComponentFixture<LastestProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastestProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastestProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
