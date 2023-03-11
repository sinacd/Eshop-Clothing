import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUserDTO } from 'src/app/DTOs/Sliders/Account/RegisterUserDTO';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 public registerForm!: FormGroup;
 @ViewChild('sweetAlart')
 private readonly sweetAlart!: SwalComponent;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      email:new FormControl(null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]),
      firstName:new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      lastName:new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      password:new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      confirmPassword:new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      address:new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(500)
        ])
    });
  }

  submitRegisterForm() {
  const registerData=new RegisterUserDTO(
    this.registerForm.controls['email'].value,
    this.registerForm.controls['firstName'].value,
    this.registerForm.controls['lastName'].value,
    this.registerForm.controls['password'].value,
    this.registerForm.controls['confirmPassword'].value,
    this.registerForm.controls['address'].value
  );

  this.authService.registerUser(registerData).subscribe(data=>{
  console.log(data);
  if(data.status==="Success"){

    this.registerForm.reset();
    this.sweetAlart.title="عملیات با موفقیت انجام شد";
    this.sweetAlart.text ="لطفا ایمیل خود را برای تکمیل ثبت نام چک کنید ";
    this.sweetAlart.icon = "success";
    this.sweetAlart.fire();
  }
  if(data.status==="Error"){
    if(data.data.status==="EmailExist"){
      this.sweetAlart.title=" اخطار";
      this.sweetAlart.text = `ایمیل ${this.registerForm.controls['email'].value} تکراری است`;
      this.sweetAlart.icon = "warning";
     this.sweetAlart.fire();
    }
  }

})
  }


}
