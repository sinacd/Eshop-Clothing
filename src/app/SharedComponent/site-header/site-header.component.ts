import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../../services/auth.service';
import { CurrentUser } from './../../DTOs/Sliders/Account/CurrentUser';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss'],
   encapsulation: ViewEncapsulation.None

})
export class SiteHeaderComponent implements OnInit {
  public searchStr: string="adele";
title:any='کیف';
  constructor(private authService:AuthService,
    private cookieService:CookieService,
    private router:Router,
    private orderService:OrderService
    ) { }
user:CurrentUser | null | undefined;
event!:string ;
/* tSwitcher = document.getElementById('dark-mode') as HTMLInputElement; */
IstSwitcher!: number ;
 element = document.body;
  onpageLoad = localStorage.getItem("theme") ;

  ngOnInit(): void {
   
    this.searchStr=''; 
/*     if(this.onpageLoad != null && this.onpageLoad  == 'dark-mode'){

      this.element.classList.toggle('dark-mode');
      this.IstSwitcher = 1;
  
    }   */
    switch(this.onpageLoad != null && this.onpageLoad )
    {

      case 'dark-mode0':
        this.element.classList.toggle('dark-mode');
        this.IstSwitcher = 0;
        break;
      case 'dark-mode':
        this.element.classList.toggle('dark-mode');
        this.IstSwitcher = 1;
        break;
      case 'dark-mode2':
        this.element.classList.toggle('dark-mode2');
        this.IstSwitcher = 2;
        break;
    }






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
  themeToggle(event: any){

    
     if(event.target.checked){
      this.event=event.target.id;
      localStorage.setItem('theme',event.target.id);
      this.element.classList.toggle(event.target.id);
    
    }
    else{
      localStorage.setItem('theme', '');
      this.element.classList.remove(event.target.id);
    }  
  }
  search(){
    console.log(this.searchStr);
    this.router.navigate(['products/'],{queryParams:{title:this.searchStr}});
    
  /*   this.router.navigate([`products?title=${this.searchStr}`]); */
  }


}
