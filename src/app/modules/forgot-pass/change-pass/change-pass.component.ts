import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  changPassForm = this.fb.group({
    newPass: '',
    confirmPass: '',
    otp: '',
  });

  btnDisable = false;
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

   }

  validate() {
    return true;
  }

  onSubmit(){

  }

  async changePass() {
    // debugger;
    this.btnDisable = true;
    this.post(this.url, this.changePassword)
      .subscribe(
        ()=>{
        }
        // (data) => {
      //   console.log(data);
      //   // let value = data as{employeeId:string, token: string};
      //   // localStorage.getItem('token');
      //  // await this.data.getProfile();
      //   let otp = prompt("Mã OTP:");

      //   this.rests.put(this.urlOtp,{
      //     otpCode:otp,
      //     password:this.changePassword.newPassword
      //    }).then((data)=>{
      //      alert("Doi mat khau thanh cong!")
      //    }).catch((error)=>{
      //      alert("Doi mat khau that bai")
      //    })

      //   // this.router.navigate(['user/otp'])
      // }

      ,(data) => {
        console.log(data.getMail());
        // let value = data as{employeeId:string, token: string};
        // localStorage.getItem('token');
       // await this.data.getProfile();
       alert('Vui lòng check email để lấy mã OTP!');
       this.router.navigate(['/authen/otp']);
       //  let otp = prompt("Mã OTP:");

       //  this.rests.put(this.urlOtp,{
       //    otpCode:otp,
       //    password:this.changePassword.newPassword
       //   }).then((data)=>{
       //     alert("Doi mat khau thất bại!")
       //   }).catch((error)=>{
       //     alert("Doi mat khau thanh cong")

       //   })

        // this.router.navigate(['user/otp'])
      })
      // .catch((error) => {
      //   this.data.error(error['error']);
      //   this.btnDisable = false;
      // });

 }
 post(link: string,body: any){
   let headers = this.rests.getHeaders();
   if(headers instanceof HttpHeaders){
      return this.http.post(link,body,{headers:headers}).pipe(tap());
   }
   return this.http.post(link,body).pipe(tap());
 }


}
