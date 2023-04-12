import { ProductsService } from './services/products.service';
import { AuthService } from './services/auth.service';
import { EshopInterceptor } from './Utilities/EshopInterceptor';
import { SliderService } from './services/slider.service';
import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './SharedComponent/site-header/site-header.component';
import { SiteFooterComponent } from './SharedComponent/site-footer/site-footer.component';
import { IndexComponent } from './pages/index/index.component';
import { SliderComponent } from './pages/index/slider/slider.component';
import { SpecialProductsComponent } from './pages/index/special-products/special-products.component';
import { NewProductsComponent } from './pages/index/new-products/new-products.component';
import { FavoriteProductsComponent } from './pages/index/favorite-products/favorite-products.component';
import { LastestProductsComponent } from './pages/index/lastest-products/lastest-products.component';
import { BrandsComponent } from './pages/index/brands/brands.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { ProductsComponent } from './pages/products/products.component';
import { SingleProductComponent } from './SharedComponent/single-product/single-product.component';
import { NgxLoadingModule } from 'ngx-loading';
import {MatSliderModule} from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { OrderService } from './services/order.service';
import { HeaderCartComponent } from './SharedComponent/header-cart/header-cart.component';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';

import { UserSidebarComponent } from './SharedComponent/user-sidebar/user-sidebar.component';
import { UserCartComponent } from './pages/account/user-cart/user-cart.component';
import { PaymentComponent } from './pages/account/payment/payment.component';
import { PaymentHistoryComponent } from './pages/account/payment-history/payment-history.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    IndexComponent,
    SliderComponent,
    SpecialProductsComponent,
    NewProductsComponent,
    FavoriteProductsComponent,
    LastestProductsComponent,
    BrandsComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    ActiveAccountComponent,
    ProductsComponent,
    SingleProductComponent,
    ProductDetailComponent,
    HeaderCartComponent,
    EditAccountComponent,
    UserSidebarComponent,
    UserCartComponent,
    PaymentComponent,
    PaymentHistoryComponent
    


   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
   SweetAlert2Module.forRoot(),
    NgxLoadingModule.forRoot({
      fullScreenBackdrop:true,

    }),
    MatSliderModule,
    BrowserAnimationsModule,
  ],
  providers: [
    OrderService,
    SliderService,
    AuthService,
    ProductsService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:EshopInterceptor,
    multi:true
  },
  CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
