import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/services/user.service';

@Component({
  selector: 'ngx-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    public userService: UserService,
    public route: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: this.fb.control('',[Validators.required]),
      email: this.fb.control('',[Validators.required,Validators.email]),
      userName: this.fb.control('',[Validators.required]),
      gender: this.fb.control(''),
      hometown: this.fb.control(''),
      birthDay: this.fb.control(''),
      password: this.fb.control('',[Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      phoneNumber: this.fb.control(''),
    });
  }

  onSubmit(){
    const user = {
      fullName: this.registerForm.controls.fullName.value,
      email: this.registerForm.controls.email.value,
      userName: this.registerForm.controls.userName.value,
      password: this.registerForm.controls.password.value,
      birthDay: this.registerForm.controls.birthDay.value,
      phoneNumber: this.registerForm.controls.phoneNumber.value,
      homeTown: this.registerForm.controls.hometown.value,
      gender: this.registerForm.controls.gender.value,
      avatarName: '',
    };
    console.log(user);
    this.userService.register(user).subscribe((data)=>{
      if(data === false){
        alert('Đăng ký không thành công');
        return;
      }else{
            alert('Đăng ký thành công, vui lòng kiểm tra mail để kích hoạt tài khoản');
        };
      this.route.navigate(['/auth']);
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    });
  }

}
