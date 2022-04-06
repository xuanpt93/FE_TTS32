import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emit } from 'process';
import { tap } from 'rxjs/operators';
import { ChangePassword } from '../../../@core/models/changePassword';
import { DataService } from '../../../@core/services/data.service';
import { RestApiService } from '../../../@core/services/rest-api.service';

@Component({
  selector: 'ngx-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {

  changePassword: ChangePassword;

  changePassForm: FormGroup;

  email: string;

  //btnDisable = false;
  url = 'http://localhost:9090/api/public/changePassword';
  urlOtp = 'http://localhost:8080/api/public/change-password';
  constructor(
    private fb: FormBuilder,
    private rests: RestApiService,
    private data: DataService,
    private router: Router,
    private http: HttpClient) {
    this.changePassword = new ChangePassword();
   }

   ngOnInit() {
    this.email = this.data.getMail();
    if(this.email === undefined){
      this.router.navigate(['/confirm-mail']);
    }
    this.changePassForm = this.fb.group({
      newPass: this.fb.control('',
        [Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')],
      ),
      confirmPass: this.fb.control('',
      [Validators.required],
    ),
      otp: this.fb.control('',
      [Validators.required],
    ),
    });
   }

  onSubmit(){
    this.changePassword.email = this.data.getMail();
    this.changePassword.newPassword = this.changePassForm.controls.newPass.value;
    this.changePassword.otp = this.changePassForm.controls.otp.value;
    this.changePass();
  }

  async changePass() {
    // debugger;
    //this.btnDisable = true;
    this.post(this.url, this.changePassword)
      .subscribe(
        (data: any) => {
          console.log('data'+ data.message);
          if(data.message === 'false'){
            window.alert('Thay đổi mật khẩu thất bại, kiểm tra lại mã OTP hoặc thử lại sau');
            return;
          };
          window.alert('Thay đổi mật khẩu thành công');
          this.router.navigate(['/auth']);
        });
 }
 post(link: string,body: any){
   let headers = this.rests.getHeaders();
   if(headers instanceof HttpHeaders){
      return this.http.post(link,body,{headers:headers}).pipe(tap());
   }
   return this.http.post(link,body).pipe(tap());
 }


}
