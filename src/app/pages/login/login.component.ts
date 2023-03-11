import { OrderService } from 'src/app/services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUser } from './../../DTOs/Sliders/Account/CurrentUser';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginUserDTO } from 'src/app/DTOs/Sliders/Account/LoginUserDTO';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  message!: string;
  @ViewChild('sweetAlart')
  private readonly sweetAlart!: SwalComponent;
  constructor(private authService:AuthService,
    private router:Router,
    private cookieService:CookieService,
    private orderService:OrderService
    
    ) { }

  ngOnInit(): void {
   
    this.loginForm=new FormGroup({
      email:new FormControl(null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]),
     
      password:new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ])

    });
  }

  submitLoginForm() {
    if(this.loginForm.valid)
    {  const loginData=new LoginUserDTO(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    );
    this.authService.loginUser(loginData).subscribe(data=>{
     console.log(data);
     
      const currentUser =new CurrentUser(
        data.data.userId,
        data.data.firstName,
        data.data.lastName,
        data.data.address
      );
   
/*       this.authService.getCurrentUser().subscribe(user=>{
      
      }); */
      if(data.status==="Success"){
        console.log(data);
        
        this.cookieService.set('eshop-cookie',data.data.token,data.data.expireTime*60)
        this.authService.setCurrentUser(currentUser);
        this.loginForm.reset();
       
      this.router.navigate(['']);
      }
     else if(data.status==="Error"){

console.log(data);
this.message=data.data.message;
        this.sweetAlart.text=data.data.message; 
         this.sweetAlart.fire();
      }
     else if(data.status==="NotFound"){
    this.message=data.data.message;
        this.sweetAlart.text=data.data.message; 
        this.sweetAlart.fire();
      }
    
    })
  }


  }

}
