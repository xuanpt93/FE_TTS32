import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../@core/models/user';
import { AuthService } from '../../@core/services/auth.service';
import { TokenService } from '../../@core/services/token.service';
import { UserService } from '../../@core/services/user.service';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  formLogin: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;
  user: User;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  initForm() {
    this.formLogin = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false,
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.formLogin.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          this.isLoggedIn = true;
          this.tokenService.saveToken(data.token);
          const token = this.userService.getDecodedAccessToken();
          localStorage.setItem('token',JSON.stringify(token));
          this.userService.getUserByUserName(token.sub).subscribe((item)=>{
            if(item.activate === true){
              if(token.auth ==='ROLE_ADMIN' || token.auth === 'ROLE_JE'){
              this.router.navigate(['/home/']);
              }else{
              this.router.navigate(['/register']);
              }
            }else{
              alert('Tài khoản chưa được kích hoạt');
            }
          });
        },(error: HttpErrorResponse)=>{
          alert('đăng nhập thất bại'+ error.message);
        });
    }
  }

}
