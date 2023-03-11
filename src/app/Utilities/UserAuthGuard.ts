import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class UserAuthGuard implements CanActivate {

    constructor(
      private authService: AuthService,
      private router: Router
    ) {
    }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isAuthenticated().then(res => {
        if (res) {
          return true;
        } else {
      //    this.router.navigate(['login']);
        }
  
        return false;
      });
    }
  }
  