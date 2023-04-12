import { UserCartComponent } from './pages/account/user-cart/user-cart.component';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';
import { UserAuthGuard } from './Utilities/UserAuthGuard';
import { IndexComponent } from './pages/index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { PaymentComponent } from './pages/account/payment/payment.component';
import { PaymentHistoryComponent } from './pages/account/payment-history/payment-history.component';

const routes: Routes = [
  {path:'',component:IndexComponent },
  {path:'contact-us',component:ContactUsComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'active-account/:activeCode',component:ActiveAccountComponent},
  {path:'products',component:ProductsComponent},
  {path:'products/:productId/:productName',component:ProductDetailComponent},
  {path:'user/edit',component:EditAccountComponent,canActivate:[UserAuthGuard]},
  {path:'user/cart',component:UserCartComponent,canActivate:[UserAuthGuard]},
  {path:'user/payment-history',component:PaymentHistoryComponent},
  {path:'online-payment/:Id',component:PaymentComponent,canActivate:[UserAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
