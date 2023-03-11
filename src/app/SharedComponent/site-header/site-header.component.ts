import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../../services/auth.service';
import { CurrentUser } from './../../DTOs/Sliders/Account/CurrentUser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {

  constructor(private authService:AuthService,
    private cookieService:CookieService,
    private router:Router,
    private orderService:OrderService
    ) { }
user:CurrentUser | null | undefined;
  ngOnInit(): void {


    this.authService.getCurrentUser().subscribe(user=>{
      this.user=user;
    
      
    })
  }
  logOutUser(){
  /*   this.authService.logOutUser().subscribe(res=>{
      if(res.status==='Success'){
        console.log("user is log out");
        
      }
    }) */
    this.cookieService.delete('eshop-cookie');
    this.authService.setCurrentUser(null);
    this.orderService.setOrderDetails(null)
    this.router.navigate(['']);
  }

}
