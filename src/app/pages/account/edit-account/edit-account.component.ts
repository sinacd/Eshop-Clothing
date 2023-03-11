import { EditUserDTO } from './../../../DTOs/Sliders/Account/EditUserDTO';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentUser } from 'src/app/DTOs/Sliders/Account/CurrentUser';
import { AuthService } from 'src/app/services/auth.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  userEditForm!: FormGroup;
  currentUser!: CurrentUser | null;
  @ViewChild('sweetAlart')
  private readonly sweetAlart!: SwalComponent;
  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
if(res)
{
  this.userEditForm = new FormGroup({
    firstName: new FormControl(
      res.firstName,
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ),
    lastName: new FormControl(
      res.lastName,
      [
        Validators.required,
        Validators.maxLength(100)
      ]),
    address: new FormControl(
      res.address,
      [
        Validators.required,
        Validators.maxLength(500)
      ])
  });
}
    
    });
  }

  submitUserEditForm() {
    if (this.userEditForm.valid) {
     const user= new EditUserDTO(
      this.userEditForm.controls["firstName"].value,
      this.userEditForm.controls["lastName"].value,
      this.userEditForm.controls["address"].value
     )
     this.authService.editUser(user).subscribe(res=>{
     if(res.status=="Success")
     {
      console.log( this.currentUser!.userId);
 this.authService.setCurrentUser(new CurrentUser(
  this.currentUser!.userId,
  user.firstName,
  user.lastName,
  user.address
)); 
this.sweetAlart.text=res.data.message; 
this.sweetAlart.fire();
     }
     })
    
    } else {
      this.userEditForm.markAllAsTouched();
    }
  }

}
