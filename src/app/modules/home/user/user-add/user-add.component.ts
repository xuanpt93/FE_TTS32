import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../@core/services/user.service';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {

  addUserForm: FormGroup;

  constructor(
    public userService: UserService,
    public route: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      fullName: this.fb.control('',[Validators.required]),
      email: this.fb.control('',[Validators.required,Validators.email]),
      userName: this.fb.control('',[Validators.required]),
      gender: this.fb.control(''),
      hometown: this.fb.control(''),
      birthDay: this.fb.control(''),
      password: this.fb.control('',[Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      phoneNumber: this.fb.control(''),
      isActive: this.fb.control(''),
      isDelete: this.fb.control(''),
    });
  }

  onSubmit(){
    const user ={
      fullName: this.addUserForm.controls.fullName.value,
      email: this.addUserForm.controls.email.value,
      userName: this.addUserForm.controls.userName.value,
      password: this.addUserForm.controls.password.value,
      birthDay: this.addUserForm.controls.birthDay.value,
      phoneNumber: this.addUserForm.controls.phoneNumber.value,
      homeTown: this.addUserForm.controls.hometown.value,
      role: 'ROLE_JE',
    };
    this.userService.addUser(user).subscribe((data)=>{
      if(data === false){
        alert('Thêm user không thành công');
      }else{
        alert('Thêm user thành công');
      }
      this.route.navigate(['/home/user']);
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    });
  }
}
