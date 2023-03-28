import { OrderService } from './services/order.service';
import { CurrentUser } from './DTOs/Sliders/Account/CurrentUser';
import { AuthService } from './services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService,
    private orderService:OrderService){
    
  }
/*    tSwitcher = document.getElementById('theme-switcher') as HTMLInputElement;
   IstSwitcher: boolean = false;
    element = document.body;
     onpageLoad = localStorage.getItem("theme") ;

 */

                 
  ngOnInit(): void {
 
  /* theme */

 
/*   if(this.onpageLoad != null && this.onpageLoad  == 'dark-mode'){

    this.element.classList.toggle('dark-mode');
    this.IstSwitcher = true;
   

  }   */
//  this.element.classList.add(this.onpageLoad);
 
/* theme end */
















    
    this.authService.checkUSerAuth().subscribe(result=>{

     
    
     if(result.status=='Success')
     {
      const user =new CurrentUser(result.data.userId,
        result.data.firstName,
        result.data.lastName,
        result.data.address);
        this.authService.setCurrentUser(user);
     }
      
    })

this.orderService.getUserCartDetails().subscribe(res=>{
  if(res.status==="Success")
  {
    this.orderService.setOrderDetails(res.data)
  }
})

  }



/*   themeToggle(event: any){
    
    if(event.target.checked){
      localStorage.setItem('theme', 'dark-mode');
      this.element.classList.toggle('dark-mode');
    }
    else{
      localStorage.setItem('theme', '');
      this.element.classList.remove('dark-mode');
    }
  } */


  title = 'eshop-pro';
}
