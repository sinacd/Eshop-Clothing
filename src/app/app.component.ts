import { OrderService } from './services/order.service';
import { CurrentUser } from './DTOs/Sliders/Account/CurrentUser';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService,
    private orderService:OrderService){
    
  }
  




                 
  ngOnInit(): void {
    this.authService.checkUSerAuth().subscribe(result=>{
      console.log("this is result");
      console.log(result);
      console.log("this is result end");

    
     
    
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
  title = 'eshop-pro';
}
