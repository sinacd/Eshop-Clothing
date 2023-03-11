import { IResponseResult } from './../DTOs/Sliders/Common/IResponseResult';
import { CookieService } from 'ngx-cookie-service';
import { ICheckUserAuthResult } from './../DTOs/Sliders/Account/ICheckUserAuthResult';
import { CurrentUser } from './../DTOs/Sliders/Account/CurrentUser';
import { ILoginUserAccount } from './../DTOs/Sliders/Account/ILoginUserAccount';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RegisterUserDTO } from './../DTOs/Sliders/Account/RegisterUserDTO';
import { Injectable } from '@angular/core';
import { LoginUserDTO } from '../DTOs/Sliders/Account/LoginUserDTO';
import { EditUserDTO } from '../DTOs/Sliders/Account/EditUserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private currentUser: BehaviorSubject<CurrentUser|null> = new BehaviorSubject<CurrentUser|null>(null);
  constructor(private http:HttpClient,
    private cookieService:CookieService
    ) { }

    isAuthenticated() {
     if(!this.loggedIn)
     {
      const promise = new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve(this.loggedIn)
      },400)
      });
      return promise;
     }else
     {
      const promise = new Promise((resolve, reject) => {
          resolve(this.loggedIn)
      });
      return promise;
     }
    } 
  

  setCurrentUser(user:CurrentUser|null):void{
    this.currentUser.next(user);
    if(user!=null){
      this.loggedIn=true;

    }
    else
      this.loggedIn=false;



  }
  getCurrentUser():Observable<CurrentUser | null >{
return this.currentUser;
  }

  registerUser(registerData:RegisterUserDTO):Observable<any>{
    return this.http.post<any>('Account/register',registerData);
  }
  loginUser(loginUserDTO:LoginUserDTO):Observable<ILoginUserAccount>{
    return this.http.post<ILoginUserAccount>('Account/login',loginUserDTO);
  }
checkUSerAuth():Observable<ICheckUserAuthResult>{
return  this.http.post<ICheckUserAuthResult>('Account/check-auth',null);
}
logOutUser():Observable<any>{
return this.http.get('Account/sign-out');
}
activateUser(emailActiveCode :string):Observable<any>{
  return this.http.get<any>('Account/activate-user/'+emailActiveCode);
}
editUser(user :EditUserDTO):Observable<IResponseResult<any>>{
  return this.http.post<IResponseResult<any>>('Account/EditUser',user);
}




}
