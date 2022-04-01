import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../@core/models/user';
import { DataService } from '../../../@core/services/data.service';
import { RestApiService } from '../../../@core/services/rest-api.service';

@Component({
  selector: 'ngx-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.scss'],
})
export class ConfirmMailComponent implements OnInit {

  confirmForm: FormGroup;
  user: User;
  btnDisable = false;
  url = 'http://localhost:9090/api/public/forgotPassword';
  constructor(private rest: RestApiService,
    public data: DataService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.user = new User();
     }

  ngOnInit(): void {
    this.confirmForm = this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
    });
  }

  sendMail(){
    // 1. lay data
    //2. call api post
  }

  validate(){
    return true;
  }
  confirmMail(){
    this.btnDisable = true;
    if(this.validate()){
      this.put(this.url, this.user)
          .then((data) => {
            // this.data.success('Employee is save');
            this.data.setMail(this.user.email);
          alert('Vui lòng check email để lấy mã OTP để đổi mật khẩu!');
          this.router.navigate(['/change-pass']);
          this.btnDisable = false;
          })
          // eslint-disable-next-line @typescript-eslint/no-shadow
          .catch((error)=>{
            alert('Gửi mã OTP thất bại vui lòng kiểm tra lại email!');

          this.data.error(error['message']);
          this.btnDisable = false;
          });
    }
  }
  put(link: string,body: any){
    return this.http.put(link +'/' ,body).toPromise();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get email() {
    return this.confirmForm.get('email');
  }

}
