import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { SliderService } from 'src/app/services/slider.service';
import { Pipe, PipeTransform, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginUserDTO } from 'src/app/DTOs/Sliders/Account/LoginUserDTO';
import { CurrentUser } from 'src/app/DTOs/Sliders/Account/CurrentUser';
import { By } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
let mockAuthService:any;





  beforeEach(async () => {
    mockAuthService= jasmine.createSpyObj(['loginUser','setCurrentUser']);
  

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,SweetAlert2Module.forRoot()],
      declarations: [ LoginComponent
         ],
      schemas:[NO_ERRORS_SCHEMA],
      providers:[
        { provide: AuthService, useValue: mockAuthService },
   
       
       ]


    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should make form invalid', () => {
 
    fixture.componentInstance.ngOnInit();
   fixture.detectChanges();
  
    expect(fixture.componentInstance.loginForm.valid).toBeFalsy();
  });
   it('submitting  form successfully', () => {
    component.loginForm.controls['email'].setValue("test@test.com");
    component.loginForm.controls['password'].setValue("123456789");

    const loginData=new LoginUserDTO(
    component.loginForm.controls['email'].value,
    component.loginForm.controls['password'].value
    ); 
    const currentUser =new CurrentUser(
      3,
      'سینا',
      'سعیدی',
      "تهران"
    );

    // Trigger the login function
    mockAuthService.loginUser.and.returnValue(of(
     { status: "Success", data: 
     {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc…Q1In0.3uOTRYuUHGe07wXXPqtY_NbijxDoOUXzieg3mXOGkuk', expireTime: 30, firstName: 'سینا', lastName: 'سعیدی', userId: 3
     ,address: "تهران"
    }
     }
    ));
    mockAuthService.setCurrentUser.and.returnValue(of());
 component.submitLoginForm();
 fixture.detectChanges();



    expect(mockAuthService.loginUser).toHaveBeenCalledWith(loginData);
    expect(mockAuthService.setCurrentUser).toHaveBeenCalledWith(currentUser);
    
  });
  it('submitting  form with Error', () => {
    component.loginForm.controls['email'].setValue("test@test.com");
    component.loginForm.controls['password'].setValue("123456789");
    
    const loginData=new LoginUserDTO(
      component.loginForm.controls['email'].value,
      component.loginForm.controls['password'].value
      ); 
      
      
      // Trigger the login function
      mockAuthService.loginUser.and.returnValue(of( 
        { status: "NotFound", data: 
        { message: '  کاربری با این مشخصات وجود ندارد  '}
     }
    ));

    component.submitLoginForm();
  
    fixture.detectChanges();
    
    
 

    expect(mockAuthService.loginUser).toHaveBeenCalledWith(loginData);
    expect(component.message).toContain('کاربری ');
    
  });










});
