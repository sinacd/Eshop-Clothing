import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss']
})
export class ActiveAccountComponent implements OnInit {

  isloading = true;

  constructor(
    private activatedRoute: ActivatedRoute
    ,private authService: AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.authService.activateUser(this.activatedRoute.snapshot.params['activeCode']).subscribe(async res=>{
      if (res.status==='Success')
      {
        this.isloading= false;
        await this.sleep(5000);
        this.router.navigate(['login']);
      }
      
    });
    
  }
  sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

}
